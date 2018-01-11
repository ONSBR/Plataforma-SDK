var config = require('./config');

class ProcessMemoryHelper {
    
    static getProcessMemory(processInstance, processInstanceId, callback) {
        var urlGetProcessMemory = config.processMemoryUrl + processInstance.processo + "/" + 
            processInstanceId + "/head";
        console.log("url Get Process Memory: " + urlGetProcessMemory);
        client.get(urlGetProcessMemory, callback);
    }

    static updateProcessMemory(contexto) {
        // TODO: o evento só pode ser enviado depois da resposta da atualização do processmemory
        var args = { data: contexto, headers: { "Content-Type": "application/json" } };
    
        var urlMemoryCreate = config.processMemoryUrl + contexto.evento.processName + "/" +
            contexto.id + "/commit";
        console.log("urlMemoryCommit: " + urlMemoryCreate);
    
        var client = new Client();
        var reqExec = client.post(urlMemoryCreate, args, function (data, response) {
            console.log("Contexto atualizado na memória de processo com sucesso." + data.instanceId);
        });
        reqExec.on('error', function (err) {
            console.log('Erro ao atualizar memória de processo.', err);
        });
    }

}

module.exports = ProcessMemoryHelper;