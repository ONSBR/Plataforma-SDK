var config = require('../config');
var Client = require('node-rest-client').Client;
var CoreRepository = require("../services/CoreRepository");
var DataSet = require("plataforma-core/DataSet");
var EventHelper = require("../EventHelper");
var cmd = require('node-command-line');
var Promise = require('bluebird');

var instprocess = process.argv[2];

console.log("instprocess = " + instprocess);

var client = new Client();

var coreRepository = new CoreRepository();
var instance = coreRepository.getProcessInstance(instprocess);

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
        for (var i = 0; i < operations.length; i++) {
            var operation = operations[i];
            executeOperation(operation, contexto);
        }
    } else {
        console.log("Nenhuma operação esperava receber esse evento!!");
    }
}

function executeOperation(operation, contexto) {
    var processo = coreRepository.getProcess(operation.processo);

    console.log("Process Found!! " + JSON.stringify(processo) + ", opname: " + operation.processo);
    let imageName = operation.arquivo;
    let metodo = operation.metodo;
    executeContainer(imageName, metodo, instprocess);

    console.log("Operação executada com sucesso: Image " + imageName + " process " + metodo);
}

function executeContainer(imageName, metodo, instprocess) {
    Promise.coroutine(function* () {
        console.log('sudo docker run --net="host" '
        + '-v /home/hugomenezes/ONS/src/Plataforma-SDK/_scripts/shell/core.db:/usr/src/app/core.db' 
        + imageName + ' node app.js ' + instprocess + ' ' + metodo);
        
        var response = yield cmd.run('sudo docker run --net="host" '
        + '-v /home/hugomenezes/ONS/src/Plataforma-SDK/_scripts/shell/core.db:/usr/src/app/core.db ' 
        + imageName + ' node app.js ' + instprocess + ' ' + metodo);
        if (response.success) {
            console.log("Docker sucess: " + response.message);
        } else {
            console.log("Docker error: " + response.error);
        }
    })();
}