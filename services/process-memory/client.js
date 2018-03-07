module.exports = class ProcessMemoryClient{
    constructor(environment,http){
        this.http = http;
        this.env = environment;
    }

    commit(context){
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${context.instanceId}/commit?app_origin=node_sdk`;
        console.log(`posting to process memory`);
        return this.http.post(url,context);
    }

    head(instanceId){
        console.log(`get head of process memory ${instanceId}`);
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${instanceId}/head?app_origin=node_sdk`;
        return this.http.get(url);
    }

    first(context){
        console.log(`get first of process memory ${context.instanceId}`)
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${context.instanceId}/first?app_origin=node_sdk`;
        return this.http.get(url);
    }
};