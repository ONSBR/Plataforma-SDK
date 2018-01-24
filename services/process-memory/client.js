module.exports = class ProcessMemoryClient{
    constructor(environment,http){
        this.http = http;
        this.env = environment;
    }

    commit(context){
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${context.instanceId}/commit`
        return this.http.post(url,context);
    }

    head(context){
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${context.instanceId}/head`
        return this.http.get(url,context);
    }

    first(context){
        var d = this.env.processMemory;
        var url = `${d.scheme}://${d.host}:${d.port}/${context.instanceId}/first`
        return this.http.get(url,context);
    }
}