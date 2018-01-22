const Client = require('node-rest-client').Client;
const ProcessMemoryHelper = require("../ProcessMemoryHelper");
const CoreFacade = require("../services/api-core/apiCoreFacade");
const DataSetHelper = require("../DataSetHelper");
const config = require("../config");
const EventHelper = require("../EventHelper");
const DataSet = require("plataforma-core/DataSet");
const Utils = require("../utils")
const DomainClient = require("../services/domain/client");
class ProcessApp {

    constructor(entryPoint) {
        //this.processInstanceId = process.env.INSTANCE_ID;
        //this.processId = process.env.PROCESS_ID;
        this.processInstanceId = "8b8dcaff-09f6-40b7-b94e-ca6e519e67c4";
        this.processId = "61728cac-a576-4643-8e58-82a83b304053";
        this.systemId = "ec498841-59e5-47fd-8075-136d79155705";
        this.executeOperation = this.executeOperation.bind(this);
        this.entryPoint = entryPoint;
        this.coreFacade = new CoreFacade({
            scheme: "http",
            host: "localhost",
            port: "9100"
        });
        this.domainClient = new DomainClient(this.systemId,this.coreFacade);
    }

    startProcess() {
        console.log("Process Instance Id= " + this.processInstanceId);
        new ProcessMemoryHelper().getProcessMemory(this.processId, this.processInstanceId)
            .then(initialCommit => {
                return this.populateDataSetBasedOnEvent(initialCommit);
            }).then(memory => {
                return this.executeOperation(memory);
            }).then(() => {
                console.log("Operação executada com sucesso: " + this.operation);
            }).catch(e => {
                console.log(`Erro ao executar operação ${this.operation}: Erro: ${e.toString()}`);
            });

    }

    executeOperation(contexto) {
        return new Promise((resolve, reject) => {
            console.log("Execute operation " + this.operation);
            contexto.dataSet = new DataSet(contexto.dataSet);
            var operationPromise = new Promise((resolve, reject) => {
                this.entryPoint(contexto, resolve, reject);
            }).then(() => {
                return DataSetHelper.save(this.operation, contexto);
            }).then(() => {
                return ProcessMemoryHelper.updateProcessMemory(contexto);
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

    populateDataSetBasedOnEvent(event) {
        return new Promise((resolve, reject) => {
            this.getMapByProcessId(this.processId).then(map => {
                this.loadDataByFilters(map).then((listFilters) => {
                    var promises = listFilters
                        .map(filter => this.shouldBeExecuted(event, filter))
                        .map(f => Utils.toQueryString(f))
                        .map(f => this.executeDomainQuery(f));
                    Promise.all(promises).then(result => {
                        console.log(result);
                        resolve(map);
                    }).catch(reject);
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
            params.forEach(p => result[p] = event.payload[p])
            return result;
        }
    }



    loadDataByFilters(map) {
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

    getFiltersMap(map) {
        return new Promise((resolve, reject) => {
            Object.keys(map).forEach(entity => {
                if (map[entity]["filters"]) {
                    var list = [];
                    Object.keys(map[entity]["filters"]).forEach(filter => {
                        console.log(filter);
                        list.push({ name: filter, content: map[entity]["filters"][filter] })
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
                resolve(nativeObject);
            }).catch(reject);
        });

    }

}

module.exports = ProcessApp;