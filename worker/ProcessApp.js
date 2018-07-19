const CoreFacade = require("../services/api-core/apiCoreFacade");
const DataSet = require("../dataset/dataset");
const DataSetBuilder = require("../dataset/builder");
const Utils = require("../utils");
const DomainClient = require("../services/domain/client");
const Logger = require("./logger")
const hash = require('object-hash');
class ProcessApp {

    constructor(info, coreFacade, domainClient, processMemoryClient, eventManager) {
        this.processInstanceId = info.processInstanceId;
        this.processId = info.processId;
        this.systemId = info.systemId;
        this.eventIn = info.eventIn;
        this.syncDomain = info.persistDomainSync || false;
        this.executeOperation = this.executeOperation.bind(this);
        this.coreFacade = coreFacade;
        this.domainClient = domainClient;
        this.processMemory = processMemoryClient;
        this.bus = eventManager;
    }

    start(entryPoint) {
        this.entryPoint = entryPoint;
        this.datasetBuilt = false;
        console.log(`process instance ${this.processInstanceId}`);
        return this.processMemory.head(this.processInstanceId).then(head => {
            var context = {};
            this.currentBranch = head.event.branch || "master";
            this.domainClient.branch = this.currentBranch;
            console.log(`get head of process memory`);
            if (head && !head.dataset) {
                context = head;
                this.datasetBuilt = false;
                this.referenceDate = head.reference_date;
            } else if (head) {
                console.log(`set context as ${JSON.stringify(head, null, 4)}`);
                context = head;
                this.datasetBuilt = true;
                this.referenceDate = head.event.reference_date;
            } else {
                throw new Error(`Process Memory instance was not found`);
            }
            if (this.referenceDate) {
                console.log(`Executing process for reference date ${new Date(this.referenceDate)}`);
            }

            if (this.isReproduction(context)) {
                this.bus.scope = "reproduction";
                console.log(`Processing an execution based on Reproduction`);
            }

            return this.coreFacade.reference(this.referenceDate).operationFindByProcessId(this.processId).then(op => {
                console.log(`Operation: ${JSON.stringify(op, null, 4)}`);
                var eventIn = this.eventIn;
                op = op.filter(o => o.event_in === eventIn);
                if (op[0]) {
                    console.log("Creating context");
                    context.processId = this.processId;
                    context.systemId = this.systemId;
                    context.instanceId = this.processInstanceId;
                    context.eventOut = op[0].event_out;
                    if (op[0].commit) {
                        context.commit = op[0].commit;
                    } else {
                        context.commit = false;
                    }
                    context.reprocessable = op[0].reprocessable;

                    return this.startProcess(context);
                }
                throw new Error(`Operation not found for process ${this.processId}`);
            });
        });

    }

    hasDataset() {
        return this.datasetBuilt;
    }

    startProcess(context) {
        return new Promise((resolve, reject) => {
            console.log(`start building dataset`)
            this.buildDataset(context).then(dataset => {
                console.log(`dataset created`);
                context.dataset = dataset;
                if (!this.isReproduction(context) && !this.hasDataset(context)) {
                    console.log(`Persist created dataset on Process Memory`);
                    return this.processMemory.commit(context);
                } else {
                    console.log(`Reproduction event will save dataset because process memory already clone from original instance`);
                    return new Promise((resolve, reject) => {
                        resolve(context)
                    });
                }
            }).then(r => {
                console.log(`context commited`);
                return this.executeOperation(context);
            }).then((result) => {
                console.log(`Process executed with success`);
                resolve(result);
            }).catch(e => {
                console.log(`Erro during process execution: ${e.toString()}`);
                var parts = context.event.name.split(".");
                parts.pop();
                var name = parts.join(".");
                if (e["toString"]) {
                    this.bus.emit({
                        name: name + ".error",
                        instanceId: context.instanceId,
                        scope: context.event.scope,
                        tag: context.event.tag,
                        branch: this.currentBranch,
                        reprocessing: context.event.reprocessing,
                        payload: {
                            message: e.toString()
                        }
                    });
                } else {
                    this.bus.emit({
                        name: name + ".error",
                        instanceId: context.instanceId,
                        branch: this.currentBranch,
                        scope: context.event.scope,
                        tag: context.event.tag,
                        reprocessing: context.event.reprocessing,
                        payload: {
                            message: "no message defined"
                        }
                    });
                }
                reject(e);
            });
        });

    }

    buildDataset(context) {
        if (context.dataset) {
            console.log('data set already exists');
            return new Promise((resolve) => {
                resolve(new DataSet(context.dataset, this.currentBranch));
            });
        } else {
            console.log('loading dataset from domain');
            return this.loadDataFromDomain(context)
                .then(data => {
                    console.log("Data retrived from domain");
                    console.log("building dataset");
                    if (!data) {
                        data = [];
                    }
                    return new DataSetBuilder(data, this.domainClient, this.currentBranch).build(context);
                })
        }
    }

    fork(context) {
        if (context.event.scope !== "execution"){
            return new Promise(resolve => resolve());
        }
        var types = Object.keys(context.dataset.entities);
        var startedAt = new Date();
        types.forEach(t => {
            context.dataset.entities[t].forEach(e => {
                var current = new Date(e._metadata.modified_at);
                if (current < startedAt) {
                    startedAt = current;
                }
                e._metadata.branch = context.fork.name;
            });
        });
        context.fork.startedAt = startedAt;
        return new Promise((resolve,reject) => {
            this.coreFacade.processInstance.save({"id":this.processInstanceId, "isFork":true}).then(()=>{
            this.coreFacade.branch.findBySystemIdAndName(context.systemId,context.fork.name).then(c => {
                if (c.length == 0){
                    this.coreFacade.branch.save(context.fork).then(resolve).catch(reject);
                }else{
                    reject(new Error(`branch ${context.fork.name} already exist!`))
                }
            }).catch(reject)
        })});
    }

    executeOperation(context) {
        return new Promise((resolve, reject) => {
            console.log("Execute operation");
            var out = null;
            var operationPromise = new Promise((resolve, reject) => {

                var localContext = {};
                localContext.context = context;
                localContext.resolve = resolve;
                localContext.reject = reject;
                localContext.eventManager = this.bus;

                localContext.fork = (name, description) => {
                    if (context.event.branch === name) {
                        //evita que um fork seja realizado duas vezes no domain
                        context.commit = false;
                    }
                    context.fork = {
                        name: name,
                        description: description,
                        systemId: context.systemId,
                        status: "open",
                        //TODO deve-se colocar o nome do usuário que mandou abrir o cenario
                        owner: "anonymous"
                    }
                }

                localContext.log = new Logger(context);

                var args = Utils.getFunctionArgs(this.entryPoint);
                var injectedArgs = args.map(a => localContext[a]);
                this.entryPoint(...injectedArgs);
            }).then((result) => {
                out = result;
                console.log(`commiting data on process memory`);
                if (context.fork) {
                    return this.fork(context);
                } else {
                    return new Promise((res => res()));
                }
            }).then(() => {
                return this.processMemory.commit(context);
            }).then(() => {
                var evt = {
                    name: this.systemId + ".persist.request",
                    tag: context.event.tag,
                    instanceId: context.instanceId,
                    scope: context.event.scope,
                    tag: context.event.tag,
                    branch: this.currentBranch,
                    reprocessing: context.event.reprocessing,
                    payload: {
                        instanceId: context.instanceId
                    }
                };
                if (context.commit && !this.isReproduction(context) && !this.syncDomain) {
                    console.log(`emit event to domain worker`);

                    if (this.referenceDate) {
                        evt.referenceDate = this.referenceDate;
                    }
                    return this.bus.emit(evt);
                }
                if (this.syncDomain) {
                    console.log(`commiting data to domain synchronously`);
                    return this.domainClient.reference(this.referenceDate).persist(context.dataset.trackingList(), context.map.name, context.instanceId);
                }
                evt.name = context.eventOut
                console.log(`Event's origin is a reproduction or should not commit then skip to save domain`);
                return this.bus.emit(evt);
            }).catch(e => {
                reject(e);
            }).then(() => {
                resolve(out);
            });
        });

    }

    isReproduction(context) {
        var rep = context.event.reproduction;
        console.log(`check is event ${JSON.stringify(context.event)} is a reproduction`);
        return typeof rep !== "undefined" && rep.from && rep.to;
    }


    loadDataFromDomain(context) {
        console.log("Loading data from domain by SDK");
        var event = context.event;
        return new Promise((resolve, reject) => {
            this.getMapByProcessId(this.processId).then(map => {
                context.map = map;
                this.getFiltersOnMap(map).then((listFilters) => {
                    var filtersToBeQueryOnDomain = listFilters.map(filter => this.shouldBeExecuted(event, filter))
                    var promise = this.domainClient.reference(this.referenceDate).queryMany(filtersToBeQueryOnDomain, context);
                    promise.then(r => {
                        //Criar o summario de contulta e gravar na ProcessMemory
                        if  (context.event.scope == "execution") {
                            this.buildQuerySummary(context, r).then(()=>resolve(r)).catch(reject)
                        }else{
                            resolve(r);
                        }
                    }).catch(e => {
                        reject(e);
                    });
                }).catch(reject);
            }).catch(reject);
        });
    }



    buildQuerySummary(context, dataquery) {
        return new Promise((resolve,reject)=>{
            var summary = {
                systemId: this.systemId,
                process: this.processInstanceId,
                branch: context.event.branch,
                processAppId: context.processId,
                version: context.event.version,
                reprocessable: context.reprocessable,
                idempotencyKey:context.event.idempotencyKey,
                tag: context.event.tag,
                entities:[]
            };
            dataquery.forEach((collection)=>{
                if(collection.length > 0) {
                    var col = collection[0]
                    var info = {}
                    var q  = col._metadata.queryInfo;
                    info.name =  q.name
                    info.parameters = q.filter
                    info.query = q.query
                    info.data = collection.map(c => {  return { id: c.id, rid:c._metadata.rid}})
                    summary.entities.push(info)
                }
            })
            this.processMemory.saveDocument(summary,("query_instance_"+this.systemId).replace("-","_"))
            .then(()=> {resolve(dataquery)}).catch(reject);
        });
    }

    /**
     *
     * @param {Object} event Event from Plataforma
     * @param {Object} filter Filter object declared in yamls in format {name:<filtername>, content: <yaml filter>}
     * @description this method returns an Object if Event payload has all parameters to execute query on domain
     */
    shouldBeExecuted(event, filter) {

        if (filter.name == 'all') {
            var result = {};
            result.filter = filter.name;
            result._entity = filter._entity;
            result._map = filter._map;

            return result;
        }
        var shouldExecuteFilter = true;
        var params = this.getFilterParams(filter.content);
        params.forEach(param => {
            if (!event.payload[param]) {
                shouldExecuteFilter = false;
                return false;
            }
        });
        if (shouldExecuteFilter) {
            var result = {};
            result.filter = filter.name;
            result._entity = filter._entity;
            result._map = filter._map;
            params.forEach(p => {
                if (p[0] === "$") {
                    var prop = p.substr(1);
                    if (Array.isArray(event.payload[prop])) {
                        result[prop] = event.payload[prop];
                    }
                } else
                    result[p] = event.payload[p]
            });

            return result;
        }
        return {};
    }



    getFiltersOnMap(map) {
        return this.getFiltersMap(map);
    }

    /**
     *
     * @param {Object} filter É o objeto de filtro do mapa no mesmo padrao do yaml
     * @description Este metodo busca quais os parametros necessarios para o filtro
     */
    getFilterParams(filter) {
        const regex = /[$|:]\w+/g;
        let m;
        var params = [];
        while ((m = regex.exec(filter)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((match, groupIndex) => {
                params.push(match.substr(1));
            });
        }
        return params;
    }

    getFiltersMap(fullMap) {
        var map = fullMap.content;

        return new Promise((resolve, reject) => {
            var list = [];
            Object.keys(map).forEach(entity => {
                if (map[entity]["filters"]) {
                    Object.keys(map[entity]["filters"]).forEach(filter => {
                        list.push({
                            _map: fullMap.name,
                            _entity: entity,
                            name: filter,
                            content: map[entity]["filters"][filter]
                        })
                    });
                }
            });
            resolve(list);
        });
    }


    getMapByProcessId(processId) {
        return new Promise((resolve, reject) => {
            console.log(`get maps from api core for process id: ${this.processId}`);
            this.coreFacade.reference(this.referenceDate).mapFindByProcessId(processId).then(map => {
                var YAML = require("yamljs");
                var nativeObject = YAML.parse(map[0].content);
                map[0].content = nativeObject;
                resolve(map[0]);
            }).catch(reject);
        });

    }

}

module.exports = ProcessApp;