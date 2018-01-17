var Client = require('node-rest-client').Client;
var ProcessMemoryHelper = require("../ProcessMemoryHelper");
var CoreFacade = require("../services/api-core/apiCoreFacade");
var DataSetHelper = require("../DataSetHelper");
var config = require("../config");
var EventHelper = require("../EventHelper");
var DataSet = require("plataforma-core/DataSet");

class ProcessApp {

    constructor(entryPoint) {
        //this.processInstanceId = process.env.INSTANCE_ID;
        //this.processId = process.env.PROCESS_ID;
        this.processInstanceId = "8b8dcaff-09f6-40b7-b94e-ca6e519e67c4";
        this.processId = "61728cac-a576-4643-8e58-82a83b304053";
        this.executeOperation = this.executeOperation.bind(this);
        this.entryPoint = entryPoint;
        this.coreFacade = new CoreFacade({
            scheme: "http",
            host: "localhost",
            port: "9100"
          });
    }

    startProcess() {
        console.log("Process Instance Id= " + this.processInstanceId);
        new ProcessMemoryHelper().getProcessMemory(this.processId, this.processInstanceId)
        .then(initialCommit => {
            return this.populateDataSetBasedOnEvent(initialCommit);
        }).then( memory => {
            return this.executeOperation(memory);
        }).then(()=>{
            console.log("Operação executada com sucesso: " + this.operation);
        }).catch(e => {
            console.log(`Erro ao executar operação ${this.operation}: Erro: ${e.toString()}`);
        });

    }

    executeOperation(contexto) {
        return new Promise((resolve,reject)=>{
            console.log("Execute operation " + this.operation);
            contexto.dataSet = new DataSet(contexto.dataSet);
            var operationPromise = new Promise((resolve,reject)=>{
                this.entryPoint(contexto,resolve,reject);
            }).then(()=>{
                return DataSetHelper.save(this.operation, contexto);
            }).then(()=>{
                return ProcessMemoryHelper.updateProcessMemory(contexto);
            }).then(()=>{
                return this.sendOutputEvents(contexto);
            }).catch(e =>{
                reject(e);
            }).then(()=>{
                resolve();
            });
        });

    }

    sendOutputEvents(contexto) {
        if (contexto.eventoSaida) {
            Object.assign(contexto.eventoSaida,contexto.evento);
            EventHelper.sendEvent(contexto.eventoSaida);
        }
    }

    populateDataSetBasedOnEvent(event){
        return new Promise((resolve,reject)=>{
            this.getMapByProcessId(this.processId).then(map =>{
                this.loadDataByFilters(map).then((listFilters)=>{
                    listFilters.forEach(f =>{
                        var list = f.content.split("\"")
                        .map(s => s.trim())
                        .filter(s => s.indexOf(": ") === -1 && s.indexOf(":") === 0).map(s => s.substr(1));
                        console.log(list);
                    });
                    resolve(map);
                }).catch(reject);
            }).catch(reject);
        });
    }

    loadDataByFilters(map){
        return this.getFiltersMap(map);
    }

    getFiltersMap(map){
        return new Promise((resolve,reject)=>{
            Object.keys(map).forEach(entity => {
                if(map[entity]["filters"]){
                    var list = [];
                    Object.keys(map[entity]["filters"]).forEach(filter =>{
                        console.log(filter);
                        list.push({name:filter, content: JSON.stringify(map[entity]["filters"][filter],null,4)})
                    });
                    resolve(list);
                }
            })
            resolve();
        });
    }


    getMapByProcessId(processId){
        return new Promise((resolve,reject)=>{
            this.coreFacade.mapFindByProcessId(processId).then(map => {
                var YAML = require("yamljs");
                var nativeObject = YAML.parse(map[0].content);
                resolve(nativeObject);
            }).catch(reject);
        });

    }

}

module.exports = ProcessApp;