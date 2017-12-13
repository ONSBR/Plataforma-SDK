var config = require('../config');
var Client = require('node-rest-client').Client;
var CoreRepository = require("../../Plataforma-SDK/services/CoreRepository");

const args = process.argv;

var instprocess = process.argv[2];

console.log(instprocess);

var client = new Client();

var coreRepository = new CoreRepository();
var instance = coreRepository.getProcessInstance(instprocess);

console.log("INSTACE: " + instance);

// TODO processname do process repositório

client.get(config.processMemoryUrl + instance.processo + "/" + instprocess + "/head", function (data, response) {
    executaChamada(data.contexto)
});

function executaChamada(contexto) {

    console.log("contexto: " + JSON.stringify(contexto));

    var operations = coreRepository.getOperationsByEvent(contexto.evento.name);
        
    if (operations.length > 0) {
        for(var i=0; i < operations.length;i++) {

            var operation = operations[i];

            var nomeDoProjeto = "Plataforma-ProcessApp";
            var nomeDoArquivoJs = operation.arquivo;
            var metodo = operation.metodo;
            var arquivoJs = require("../../" + nomeDoProjeto + "/process/" + nomeDoArquivoJs); 
            eval("arquivoJs." + metodo + "(contexto)");
        }
    } else {
        console.log("Nenhuma operação esperava receber esse evento!!");
    }
}

