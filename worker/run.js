var config = require('../config');
var Client = require('node-rest-client').Client;
var CoreRepository = require("../services/CoreRepository");
var DataSet = require("plataforma-core/DataSet");
var EventHelper = require("../EventHelper");

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

    var nomeDoArquivoJs = operation.arquivo;
    var metodo = operation.metodo;
    var arquivoJs = require(config.processAppExecutionRelativePath 
        + processo.relativePath + "/process/" + nomeDoArquivoJs);  

    eval("arquivoJs." + metodo + "(contexto)");
    
    if (operation.mustcommit && !contexto.evento.reproducao) {
        saveDataSet(contexto.dataSet, processo);
    }

    // TODO: o evento só pode ser enviado depois da resposta da atualização do processmemory
    updateProcessMemory(contexto);

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
            console.log("[ERROR] Evento se saída não configurado para o processo: " + processo.nome + ", evento: " + contexto.eventoSaida.name);    
        }
    }

    console.log("Operação executada com sucesso: " + nomeDoArquivoJs + "." + metodo);
}

function saveDataSet(dataSet, processo) {
    let entities = dataSet.entities;

    entities.forEach(entity => {
        console.log("Insert entity: " + entity);
        var args = {
            data: entity,
            headers: { "Content-Type": "application/json" }
        };
        var reqExec = client.post(config.domainAppUrl + processo.nome + "/persist", args, function (data, response) {
            console.log("Entidade persistida na api de dominio com sucesso.");
        });
        reqExec.on('error', function (err) {
            console.log('Erro ao persistir entidade.', err);
        });
    });
}

function updateProcessMemory(contexto) {
    var args = { data: contexto, headers: { "Content-Type": "application/json" } };

    var urlMemoryCreate = config.processMemoryUrl + contexto.evento.processName + "/"+
        contexto.id + "/commit";
    console.log("urlMemoryCommit: " +urlMemoryCreate);

    var client = new Client();
    var reqExec = client.post(urlMemoryCreate, args, function (data, response) {
        console.log("Contexto atualizado na memória de processo com sucesso." + data.instanceId);
    });
    reqExec.on('error', function (err) {
        console.log('Erro ao atualizar memória de processo.', err);
    });
}