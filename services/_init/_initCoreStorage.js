var Processo = require("plataforma-core/Processo");
var Presentation = require("plataforma-core/Presentation");
var Operacao = require("plataforma-core/Operacao");
var EventCatalog = require("plataforma-processapp/conta-process-app/metadados/EventCatalog");
var database = require("plataforma-processmemory/database");
var CoreStorage = require("../CoreStorage");

database.clearDatabase("core.db");


var sto = new CoreStorage();

var accountProcessName = "cadastra-conta";

var operacoesConta = [];
operacoesConta.push(new Operacao(
    "cadastra-conta.js", "insereConta", [EventCatalog.account_put], [EventCatalog.account_saved], accountProcessName, true
));    

var processoAccount = new Processo(accountProcessName, "Plataforma-ProcessApp/conta-process-app", operacoesConta);
processoAccount.dataDoDeploy = new Date();

sto.create(processoAccount, Processo.name, accountProcessName);


var transferProcessName = "transferencia-conta";

var operacoesTransferencia = [];
operacoesTransferencia.push(new Operacao(
    "transferencia-conta.js", "transfereConta", [EventCatalog.transfer_request], [EventCatalog.transfer_confirmation], transferProcessName, true
));    

var processoTransfer = new Processo(transferProcessName, "Plataforma-ProcessApp/transferencia-process-app", operacoesTransferencia);
processoTransfer.dataDoDeploy = new Date();
sto.create(processoTransfer, Processo.name, transferProcessName);


//URL para o presentation, que será direcionado pelo router.
var urlbasepresentation = "http://localhost:4200"; 

var presentationaccount = new Presentation(
    "crudcontas", urlbasepresentation, 
    [EventCatalog.account_saved, EventCatalog.transfer_confirmation], 
    [EventCatalog.account_put, EventCatalog.transfer_request]
);
sto.create(presentationaccount, Presentation.name, presentationaccount.nome);

/*var presentationtransfer = new Presentation(
    "transferenciacontas", urlbasepresentation, 
    [EventCatalog.transfer_confirmation], [EventCatalog.transfer_request]
);

sto.create(presentationtransfer, Presentation.name, presentationtransfer.nome);*/



