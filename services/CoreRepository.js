var CoreStorage = require("./CoreStorage.js");
var InstanciaDoProcesso = require("plataforma-core/InstanciaDoProcesso");
var Processo = require("plataforma-core/Processo");
var Presentation = require("plataforma-core/Presentation");
var Reproducao = require("plataforma-core/Reproducao");
var Operacao = require("plataforma-core/Operacao");
var StatusExecution = require("plataforma-core/StatusExecution");

var sto = new CoreStorage();

class CoreRepository {

    constructor() {}

    getProcess(processName) {
        return sto.head(processName, Processo.name);
    }

    addProcessInstance(instanceId, processName, dataRef, responsavel, reproducao) {
        var processInstance = new InstanciaDoProcesso(
            instanceId, new Date(), null, StatusExecution.pending, 
            responsavel, processName, dataRef, reproducao
        );
        return sto.create(processInstance, InstanciaDoProcesso.name, instanceId);
    }

    getProcessInstance(instprocess) {
        return sto.head(instprocess, InstanciaDoProcesso.name);
    }

    getReproduction(reproductionId) {
        return sto.head(reproductionId, Reproducao.name);
    }

    addReproduction(reproduction) {
        return sto.create(reproduction, Reproducao.name, reproduction.id);
    }

    getPresentation(presentationName) {
        return sto.head(presentationName, Presentation.name);
    }

    getOperationsByEvent(eventName, issaida) {

        var retorno = [];
        var processos = sto.list(Processo.name);

        for(var i=0; i < processos.length; i++) {
            var proc = processos[i];
            for(var o=0; o < proc.operacoes.length;o++) {
                var oper = proc.operacoes[o];
                if (issaida) { 
                    if (oper.eventosDeSaida.indexOf(eventName) > -1) {
                        retorno.push(oper);
                    }
                } else {
                    if (oper.eventosDeEntrada.indexOf(eventName) > -1) {
                        retorno.push(oper);
                    }
                }
            }
        }

        return retorno;
    }

    getPresentationsByEvent(eventName) {
    
        var retorno = [];
        var presentations = sto.list(Presentation.name);

        for(var i=0; i < presentations.length; i++) {
            var present = presentations[i];
                
            if (present.eventosDeEntrada.indexOf(eventName) > -1) {
                retorno.push(present);
            }
        }

        return retorno;
    }

}

module.exports = CoreRepository;