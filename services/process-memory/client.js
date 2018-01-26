module.exports = class ProcessMemoryClient{
    constructor(environment,http){
        this.http = http;
        this.env = environment;
    }

    commit(context){
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${context.instanceId}/commit`;
        return this.http.post(url,context);
    }

    head(instanceId){
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${instanceId}/head`;
        return this.http.get(url);
    }

    first(context){
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${context.instanceId}/first`;
        return this.http.get(url);
    }
};