var config = require('../config');
var Client = require('node-rest-client').Client;

const args = process.argv;

var instprocess = process.argv[2];

console.log(instprocess);

var client = new Client();

// TODO processname do process repositório

client.get(config.processMemoryUrl + processname + "/" + instprocess + "/head", function (data, response) {
    executaChamada(data.contexto)
});

function executaChamada(contexto) {
    var nomeDoProjeto = "Plataforma-ProcessApp/conta-process-app";
    var nomeDoArquivoJs = "cadastra-conta.js";
    var metodo = "insereConta";
    var arquivoJs = require("../../" + nomeDoProjeto + "/process/" + nomeDoArquivoJs); 
    eval("arquivoJs." + metodo + "(contexto)");
}

