var CoreStorage = require("./CoreStorage.js");
var InstanciaDoProcesso = require("../../Plataforma-core/InstanciaDoProcesso");
var Processo = require("../../Plataforma-core/Processo");
var Operacao = require("../../Plataforma-core/Operacao");
var StatusExecution = require("../../Plataforma-core/StatusExecution");

var sto = new CoreStorage();

class CoreRepository {

    constructor() {}

    getProcess(processName) {
        return sto.head(processName, Processo.name);
    }

    addProcessInstance(instanceId, processName, dataRef) {
        var processInstance = new InstanciaDoProcesso(
            instanceId, new Date(), null, StatusExecution.pending, 
            null, processName, dataRef
        );
        return sto.create(processInstance, InstanciaDoProcesso.name, instanceId);
    }

    getProcessInstance(instprocess) {
        return sto.head(instprocess, InstanciaDoProcesso.name);
    }

    getOperationsByEvent(eventName) {

        var retorno = [];
        var processos = sto.list(Processo.name);

        for(var i=0; i < processos.length; i++) {
            var proc = processos[i];
            for(var o=0; o < proc.operacoes.length;o++) {
                var oper = proc.operacoes[o];
                if (oper.eventosDeEntrada.indexOf(eventName) > -1) {
                    retorno.push(oper);
                }
            }
        }

        return retorno;
    }



}

module.exports = CoreRepository;