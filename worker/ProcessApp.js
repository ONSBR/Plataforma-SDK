var Client = require('node-rest-client').Client;
var ProcessMemoryHelper = require("../ProcessMemoryHelper");
var DataSetHelper = require("../DataSetHelper");
var config = require("../config");
var EventHelper = require("../EventHelper");
var DataSet = require("plataforma-core/DataSet");

class ProcessApp {

    constructor(entryPoint) {
        this.processInstanceId = process.argv[3];
        this.processId = process.argv[2];
        this.operation = process.argv[4];
        this.executeOperation = this.executeOperation.bind(this);
        this.entryPoint = entryPoint;
    }

    startProcess() {
        console.log("Process Instance Id= " + this.processInstanceId);
        console.log("Operation= " + this.operation);
        ProcessMemoryHelper.getProcessMemory(this.processId, this.processInstanceId)
        .then(memory => {
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

}

module.exports = ProcessApp;