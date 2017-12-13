var config = require('../config');
var Client = require('node-rest-client').Client;

const args = process.argv;

var instprocess = process.argv[2];
var name = process.argv[3];

console.log(instprocess);

var client = new Client();

client.get(config.processMemoryUrl + name + "/" + instprocess + "/head", function (data, response) {
    executaChamada(data.contexto)
});

function executaChamada(contexto) {
    var nomeDoProjeto = "Plataforma-ProcessApp/conta-process-app";
    var nomeDoArquivoJs = "cadastra-conta.js";
    var metodo = "insereConta";
    var arquivoJs = require("../../" + nomeDoProjeto + "/process/" + nomeDoArquivoJs); 
    eval("arquivoJs." + metodo + "(contexto)");
}

