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

    constructor(entryPoint,info, coreFacade,domainClient) {
        this.processInstanceId = info.processInstanceId;
        this.processId = info.processId;
        this.systemId = info.systemId;
        this.executeOperation = this.executeOperation.bind(this);
        this.entryPoint = entryPoint;
        this.coreFacade = coreFacade;
        this.domainClient = domainClient;
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
                this.getFiltersOnMap(map).then((listFilters) => {
                    var filtersToBeQueryOnDomain = listFilters.map(filter => this.shouldBeExecuted(event, filter))
                    Promise.all(this.domainClient.queryMany(filtersToBeQueryOnDomain)).then(result => {
                        resolve(result);
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
                        list.push({_map: fullMap.name,_entity:entity, name: filter, content: map[entity]["filters"][filter] })
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