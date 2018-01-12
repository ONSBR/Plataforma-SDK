var CoreRepository = require("../services/CoreRepository");
var Client = require('node-rest-client').Client;
var ProcessMemoryHelper = require("../ProcessMemoryHelper");
var DataSetHelper = require("../DataSetHelper");
var config = require("../config");
var EventHelper = require("../EventHelper");
var DataSet = require("plataforma-core/DataSet");
var CoreRepository = require("../services/CoreRepository");

class ProcessApp {

    constructor(processName, processInstanceId, operation) {
        this.processInstanceId = processInstanceId;
        this.processName = processName;
        this.operation = operation;
        this.coreRepository = new CoreRepository();

        this.executeOperation = this.executeOperation.bind(this);
    }

    startProcess() {
        console.log("Process Instance Id= " + this.processInstanceId);
        console.log("Operation= " + this.operation);
        const coreRepository = new CoreRepository();
        const processInstance = coreRepository.getProcessInstance(this.processInstanceId);
        this.getProcessMemory(processInstance, this.processInstanceId);
        console.log("Operação executada com sucesso: " + this.operation);
    }

    getProcessMemory(processInstance, processInstanceId) {
        var urlGetProcessMemory = config.processMemoryUrl + processInstance.processo + "/" +
            processInstanceId + "/head";
        console.log("url Get Process Memory: " + urlGetProcessMemory);
        const client = new Client();
        client.get(urlGetProcessMemory, this.executeOperation);
    }

    executeOperation(contexto) {
        console.log("Execute operation " + this.operation);

        contexto.dataSet = new DataSet(contexto.dataSet);

        this.lookupTable[this.operation](contexto);
        DataSetHelper.save(this.operation, contexto);
        ProcessMemoryHelper.updateProcessMemory(contexto);
        this.sendOutputEvents(contexto);
    }

    sendOutputEvents(contexto) {
        if (contexto.eventoSaida) {
            contexto.eventoSaida.reproducao = contexto.evento.reproducao;
            contexto.eventoSaida.dataRef = contexto.evento.dataRef;
            contexto.eventoSaida.origem = contexto.evento.origem;
            contexto.eventoSaida.instancia = contexto.evento.instancia;
            contexto.eventoSaida.responsavel = contexto.evento.responsavel;
            contexto.eventoSaida.processName = contexto.evento.processName;

            var operacoes = this.coreRepository.getOperationsByEvent(contexto.eventoSaida.name, true);
            if (operacoes.length > 0) {
                EventHelper.sendEvent(contexto.eventoSaida);
            } else {
                console.log("[ERROR] Evento de saída não configurado para o processo: " + this.processName + 
                    ", evento: " + contexto.eventoSaida.name);
            }
        }
    }

}

module.exports = ProcessApp;





