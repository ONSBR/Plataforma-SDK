var config = require('../config');
var Client = require('node-rest-client').Client;
var CoreRepository = require("../../Plataforma-SDK/services/CoreRepository");
var DataSet = require("../../Plataforma-core/DataSet");
var EventHelper = require("../../Plataforma-SDK/EventHelper");

const args = process.argv;

var instprocess = process.argv[2];

console.log(instprocess);

var client = new Client();

var coreRepository = new CoreRepository();
var instance = coreRepository.getProcessInstance(instprocess);

console.log("INSTACE: " + instance);

// TODO processname do process repositório
var urlGetProcessMemory = config.processMemoryUrl + instance.processo + "/" + instprocess + "/head";

console.log("urlGetProcessMemory: " + urlGetProcessMemory);

client.get(urlGetProcessMemory, function (data, response) {
    
    executaChamada(data);
});

function executaChamada(contexto) {

    contexto.dataSet = new DataSet(contexto.dataSet);

    var operations = coreRepository.getOperationsByEvent(contexto.evento.name);
        
    if (operations.length > 0) {
        for(var i=0; i < operations.length;i++) {

            var operation = operations[i];

            executeOperation(operation, contexto);
        }
    } else {
        console.log("Nenhuma operação esperava receber esse evento!!");
    }
}

function executeOperation(operation, contexto) {
    
    var processo = coreRepository.getProcess(operation.processo);
    
    var nomeDoArquivoJs = operation.arquivo;
    var metodo = operation.metodo;
    var arquivoJs = require("../../" + processo.relativePath + "/process/" + nomeDoArquivoJs); 
    eval("arquivoJs." + metodo + "(contexto)");

    EventHelper.sendEvent(contexto.eventoSaida);

    console.log("Operação executada com sucesso: " + arquivoJs + "." + metodo);
}