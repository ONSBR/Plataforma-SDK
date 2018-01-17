var config = require('./config');
var Client = require('node-rest-client').Client;

class ProcessMemoryHelper {

    constructor(){
        this.client = new Client();
    }

    getProcessMemory(processId, processInstanceId) {
        return new Promise((resolve,reject)=>{
            var urlGetProcessMemory = config.processMemoryUrl + processId + "/" +
            processInstanceId + "/head";
            console.log("url Get Process Memory: " + urlGetProcessMemory);
            this.client.get(urlGetProcessMemory, (data)=>{
                resolve(data);
            });

            this.client.on("error",(e)=>{
                reject(e);
            })
        });
    }

    updateProcessMemory(contexto) {
        return new Promise((resolve,reject)=>{
            // TODO: o evento só pode ser enviado depois da resposta da atualização do processmemory
            var args = { data: contexto, headers: { "Content-Type": "application/json" } };

            var urlMemoryCreate = config.processMemoryUrl + contexto.evento.processName + "/" +
                contexto.id + "/commit";
            console.log("urlMemoryCommit: " + urlMemoryCreate);

            var client = new Client();
            var reqExec = client.post(urlMemoryCreate, args, function (data, response) {
                console.log("Contexto atualizado na memória de processo com sucesso." + data.instanceId);
                resolve();
            });
            reqExec.on('error', function (err) {
                console.log('Erro ao atualizar memória de processo.', err);
                reject(err);
            });
        });

    }

}

module.exports = ProcessMemoryHelper;