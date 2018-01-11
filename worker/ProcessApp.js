var CoreRepository = require("../services/CoreRepository");
var ProcessMemoryHelper = require("../ProcessMemoryHelper");
var DataSetHelper = require("../DataSetHelper");
var config = require("../config");
var EventHelper = require("../EventHelper");
var DataSet = require("plataforma-core/DataSet");

class ProcessApp {

    constructor (processInstanceId, operation) {
        this.processInstanceId = processInstanceId;
        this.operation = operation;
    }

    startProcess() {
        console.log("Process Instance Id= " + this.processInstanceId);
        console.log("Operation= " + this.operation);
        let coreRepository = new CoreRepository();
        const processInstance = coreRepository.getProcessInstance(this.processInstanceId);
        this.getProcessMemory(this.processInstance, this.processInstanceId);
        console.log("Operação executada com sucesso: " + operation);
    }

    getProcessMemory(processInstance, processInstanceId) {
        var urlGetProcessMemory = config.processMemoryUrl + processInstance.processo + "/" + 
            processInstanceId + "/head";
        console.log("url Get Process Memory: " + urlGetProcessMemory);
        client.get(urlGetProcessMemory, function (contexto, response) {
            executeOperation(contexto);
        });
    }

    executeOperation(contexto) {
        console.log("Execute operation " + operation);
        lookupTable[operation](contexto);
        DataSetHelper.save(operation, contexto);
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
    
            var operacoes = coreRepository.getOperationsByEvent(contexto.eventoSaida.name, true);
            if (operacoes.length > 0) {
                EventHelper.sendEvent(contexto.eventoSaida);
            } else {
                console.log("[ERROR] Evento de saída não configurado para o processo: " + processo.nome + ", evento: " + contexto.eventoSaida.name);
            }
        }
    }
    
}

module.exports = ProcessApp;





