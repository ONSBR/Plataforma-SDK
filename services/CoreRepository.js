var storage = require("./CoreStorage.js");
var InstanciaDoProcesso = require("../../Plataforma-core/InstanciaDoProcesso");
var Processo = require("../../Plataforma-core/Processo");
var Operacao = require("../../Plataforma-core/Operacao");
var StatusExecution = require("../../Plataforma-core/StatusExecution");

var sto = new storage.CoreStorage();

class CoreRepository {

    addProcessInstance(instanceId, processName, dataRef) {
        var processInstance = new InstanciaDoProcesso(
            instanceId, new Date(), null, StatusExecution.pending, 
            null, processName, dataRef
        );
        return sto.create(processInstance, InstanciaDoProcesso.name, instanceId);
    }

    getProcessInstance(instprocess) {
        return sto.head(instprocess);
    }

    getOperationsByEvent(eventName) {

        var retorno = null;
        var processos = sto.list(Processo.name);
        
        for(var i=0; retorno == null && i < processos.length; i++) {
            var proc = processos[i];
            for(var o=0; o < proc.operations.length;o++) {
                var oper = proc.operations[o];
                if (oper.eventosDeEntrada.contains(eventName)) {
                    retorno = oper;
                    break;
                }
            }
        }

        return retorno;
    }



}

module.exports.CoreRepository = CoreRepository;