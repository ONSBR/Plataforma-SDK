var Processo = require("../../../Plataforma-core/Processo");
var Presentation = require("plataforma-core/Presentation");
var Operacao = require("plataforma-core/Operacao");
var EventCatalog = require("plataforma-processapp/conta-process-app/metadados/EventCatalog");
var database = require("plataforma-processmemory/database");
var CoreStorage = require("../CoreStorage");

database.clearDatabase("core.db");

var processName = "CadastraConta";

var sto = new CoreStorage();

var operacoes = [];
operacoes.push(new Operacao(
    "cadastra-conta.js", "insereConta", [EventCatalog.account_put], [EventCatalog.account_saved], processName, true
));

var processo = new Processo(processName, "Plataforma-ProcessApp/conta-process-app", operacoes);
processo.dataDoDeploy = new Date();

sto.create(processo, Processo.name, processName);

var presentation = new Presentation("crudcontas", "http://localhost:4200", [EventCatalog.account_saved], [EventCatalog.account_put]);

sto.create(presentation, Presentation.name, presentation.nome);

var processPersisted = sto.head(processName, Processo.name);

console.log(JSON.stringify(processo));
console.log(JSON.stringify(processPersisted));    

