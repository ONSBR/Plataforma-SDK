var Processo = require("../../../Plataforma-core/Processo");
var Operacao = require("../../../Plataforma-core/Operacao");
var EventCatalog = require("../../../Plataforma-ProcessApp/conta-process-app/metadados/EventCatalog");
var database = require("../../../Plataforma-ProcessMemory/database.js");
var CoreStorage = require("../CoreStorage");

database.clearDatabase("core.db");

var processName = "CadastraConta";

var sto = new CoreStorage();

var operacoes = [];
operacoes.push(new Operacao(
    "cadastra-conta.js", "insereConta", [EventCatalog.account_put], [EventCatalog.account_saved], processName
));

var processo = new Processo(processName, "Plataforma-ProcessApp/conta-process-app", operacoes);
processo.dataDoDeploy = new Date();

sto.create(processo, Processo.name, processName);

var processPersisted = sto.head(processName, Processo.name);

console.log(JSON.stringify(processo));
console.log(JSON.stringify(processPersisted));    

