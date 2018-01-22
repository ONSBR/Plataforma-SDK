    /*var Processo = require("plataforma-core/Processo");
    var Presentation = require("plataforma-core/Presentation");
    var Operacao = require("plataforma-core/Operacao");
    var EventCatalog = require("plataforma-processapp/conta-process-app/metadados/EventCatalog");
    var ClientEventCatalog = require("plataforma-processapp/cliente-process-app/metadados/EventCatalog");*/
    //var database = require("plataforma-processmemory/database");
    var CoreStorage = require("../CoreStorage");

    //database.clearDatabase("core.db");

    var sto = new CoreStorage();

    /*saveSytem(sto)
    saveAccountProcess(sto);
    saveTransferProcess(sto);
    */
    class DB {

        constructor() {

            /*
                system contains 'name', 'description' 'version' 
            */
            this.saveSystem = function(system, executorId) {                

                var body = 
                [
                    {
                        "name": system.name,
                        "description": system.description,
                        "version": system.version,
                        "_metadata": {
                            "type": "system",
                            "changeTrack":"create"
                        }
                    }
                ];
                
                console.log("body = ", body);

/*                 var systemId = sto.create(body, executorId);
                console.log("DB: systemId = ", systemId); */


                var promise = sto.create(body, executorId);
                promise.then(function (id) {                                    
                    console.log("BD:id = ", id);  
                    return id;
                }).catch(function (err) {
                    console.log(err);
                    return undefined;
                })  
            };
        }
    }

    module.exports = DB;

    /*
    function saveAccountProcess(sto) {
        var accountProcessName = "cadastra-conta";
        
        var operacoesConta = [];
        operacoesConta.push(new Operacao(
            "cadastra-conta.js", "insereConta", [EventCatalog.account_put], [EventCatalog.account_saved], accountProcessName, true
        ));    
        
        var processoAccount = new Processo(accountProcessName, "plataforma-processapp/conta-process-app", operacoesConta);
        processoAccount.dataDoDeploy = new Date();
        
        sto.create(processoAccount, Processo.name, accountProcessName);
    }

    function saveTransferProcess(sto) {
        var transferProcessName = "transferencia-conta";
        
        var operacoesTransferencia = [];
        operacoesTransferencia.push(new Operacao(
            "transferencia-conta.js", "transfereConta", [EventCatalog.transfer_request], [EventCatalog.transfer_confirmation], transferProcessName, true
        ));

        var processoTransfer = new Processo(transferProcessName, "plataforma-processapp/transferencia-process-app", operacoesTransferencia);
        processoTransfer.dataDoDeploy = new Date();
        sto.create(processoTransfer, Processo.name, transferProcessName);
    }

    function saveClientProcess(sto) {
        var clientProcessName = "cadastra-cliente";
        
        var operacoesCliente = [];
        operacoesCliente.push(new Operacao(
            "cadastra-cliente.js", "insereCliente", [ClientEventCatalog.client_put], 
                [ClientEventCatalog.client_saved], clientProcessName, true
        ));

        var processoCliente = new Processo(clientProcessName, 
            "plataforma-processapp/cliente-process-app", operacoesCliente);
        processoCliente.dataDoDeploy = new Date();
        sto.create(processoCliente, Processo.name, clientProcessName);
    }
    */

    //URL para o presentation, que será direcionado pelo router.
    /* var urlbasepresentation = "http://localhost:4200"; 

    var presentationaccount = new Presentation(
        "crudcontas", urlbasepresentation, 
        [EventCatalog.account_saved, EventCatalog.transfer_confirmation, ClientEventCatalog.client_saved], 
        [EventCatalog.account_put, EventCatalog.transfer_request, ClientEventCatalog.account_put]
    );
    sto.create(presentationaccount, Presentation.name, presentationaccount.nome); */

    /*var presentationtransfer = new Presentation(
        "transferenciacontas", urlbasepresentation, 
        [EventCatalog.transfer_confirmation], [EventCatalog.transfer_request]
    );

    sto.create(presentationtransfer, Presentation.name, presentationtransfer.nome);*/



