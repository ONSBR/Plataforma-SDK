var coreStorage = require("../CoreStorage.js");
var Processo = require("../../../Plataforma-core/Processo");
var Operacao = require("../../../Plataforma-core/Operacao");
var EventCatalog = require("../../../Plataforma-ProcessApp/conta-process-app/metadados/EventCatalog");

var database = require("../../../Plataforma-ProcessMemory/database.js");

database.clearDatabase("core.db");

var processName = "CadastraConta";

var operacoes = [];
operacoes.push(new Operacao("cadastra-conta.js", "insereConta", [EventCatalog.account_put], [], processName));

var processo = new Processo(processName, operacoes);
processo.dataDoDeploy = new Date();

var sto = new coreStorage.CoreStorage();

sto.create(processo, Processo.name, processName);

var processPersisted = sto.head(processName, Processo.name);

console.log(JSON.stringify(processo));
console.log(JSON.stringify(processPersisted));

