const Client = require('node-rest-client').Client;
const ProcessMemoryHelper = require("../ProcessMemoryHelper");
const CoreFacade = require("../services/api-core/apiCoreFacade");
const DataSetHelper = require("../DataSetHelper");
const config = require("../config");
const EventHelper = require("../EventHelper");
const DataSet = require("../dataset/dataset");
const DataSetBuilder = require("../dataset/builder");
const Utils = require("../utils")
const DomainClient = require("../services/domain/client");
class ProcessApp {

    constructor(entryPoint, info, coreFacade, domainClient, processMemoryClient) {
        this.processInstanceId = info.processInstanceId;
        this.processId = info.processId;
        this.systemId = info.systemId;
        this.executeOperation = this.executeOperation.bind(this);
        this.entryPoint = entryPoint;
        this.coreFacade = coreFacade;
        this.domainClient = domainClient;
        this.processMemory = processMemoryClient;
    }

    startProcess() {
        return new Promise((resolve, reject) => {
            var context = {};
            context.processId = this.processId;
            context.systemId = this.systemId;
            context.instanceId = this.processInstanceId;
            this.processMemory.head(context).then(head => {
                console.log(`get head of process memory`);
                if(head && !head.event){
                    //neste caso o head guarda apenas 1 evento e nao o contexto
                    context.event = head;
                }else if (head){
                    context = head;
                }else{
                    reject(new Error(`Process Memory instance was not found`));
                }
                return this.buildDataset(context);
            }).then(dataset => {
                console.log(`dataset created`);
                context.dataset = dataset;
                return this.processMemory.commit(context);
            }).then(r => {
                console.log(`context commited`);
                return this.executeOperation(context);
            }).then(()=>{
                console.log(`Process executed with success`);
                resolve();
            }).catch(e => {
                console.log(`Erro during process execution: ${e.toString()}`);
            })
        });

    }

    buildDataset(context) {
        if (context.dataset){
            return new Promise((resolve)=> {resolve(new DataSet(context.dataset))});
        }else{
            return this.loadDataFromDomain(context)
            .then(data => {
                return new Promise((resolve) => resolve(new DataSetBuilder(data).build()));
            })
        }
    }

    executeOperation(context) {
        return new Promise((resolve, reject) => {
            console.log("Execute operation");
            var operationPromise = new Promise((resolve, reject) => {
                this.entryPoint(context, resolve, reject);
            }).then(() => {
                console.log(`sending data to domain`);
                return this.domainClient.persist(context.dataset.flatList(), context.map);
            }).then(() => {
                console.log(`commiting data on process memory`);
                return this.processMemory.commit(context);
            }).then(() => {
                return this.sendOutputEvents(contexto);
            }).catch(e => {
                reject(e);
            }).then(() => {
                resolve();
            });
        });

    }

    sendOutputEvents(contexto) {
        if (contexto.eventoSaida) {
            Object.assign(contexto.eventoSaida, contexto.evento);
            EventHelper.sendEvent(contexto.eventoSaida);
        }
    }

    loadDataFromDomain(context) {
        var event = context.event;
        return new Promise((resolve, reject) => {
            this.getMapByProcessId(this.processId).then(map => {
                context.map = map.name;
                this.getFiltersOnMap(map).then((listFilters) => {
                    var filtersToBeQueryOnDomain = listFilters.map(filter => this.shouldBeExecuted(event, filter))
                    var promise = this.domainClient.queryMany(filtersToBeQueryOnDomain);
                    promise.then(r => resolve(r)).catch(reject);
                }).catch(reject);
            }).catch(reject);
        });
    }

    /**
     *
     * @param {Object} event Event from Plataforma
     * @param {Object} filter Filter object declared in yamls in format {name:<filtername>, content: <yaml filter>}
     * @description this method returns an Object if Event payload has all parameters to execute query on domain
     */
    shouldBeExecuted(event, filter) {
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
            params.forEach(p => result[p] = event.payload[p])
            return result;
        }
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
        if (typeof filter === "string" && filter[0] === ":") {
            return [filter.substr(1)];
        }
        var keys = Object.keys(filter);
        for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
                if (Array.isArray(filter[key])) {
                    var list = [];
                    filter[key].forEach(i => {
                        list.push(this.getFilterParams(i)[0]);
                    })
                    return list;
                } else {
                    return this.getFilterParams(filter[key]);
                }
            }
        }
    }

    getFiltersMap(fullMap) {
        var map = fullMap.content;
        return new Promise((resolve, reject) => {
            Object.keys(map).forEach(entity => {
                if (map[entity]["filters"]) {
                    var list = [];
                    Object.keys(map[entity]["filters"]).forEach(filter => {
                        list.push({ _map: fullMap.name, _entity: entity, name: filter, content: map[entity]["filters"][filter] })
                    });
                    resolve(list);
                }
            })
            resolve();
        });
    }


    getMapByProcessId(processId) {
        return new Promise((resolve, reject) => {
            this.coreFacade.mapFindByProcessId(processId).then(map => {
                var YAML = require("yamljs");
                var nativeObject = YAML.parse(map[0].content);
                map[0].content = nativeObject;
                resolve(map[0]);
            }).catch(reject);
        });

    }

}

module.exports = ProcessApp;