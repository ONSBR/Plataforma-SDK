module.exports = class ExecutorClient{
    constructor(environment, httpClient){
        this.http = httpClient;
        this.env = environment;
    }

    createInstance(event){
        if(!event.name){
            throw new Error("Event name is required");
        }
        if(!event.payload){
            throw new Error("Event payload is required");
        }
        if (this.scope){
            event.scope = this.scope;
        }
        var c = this.env.executor;
        var url = `${c.scheme}://${c.host}:${c.port}/instance/create`;
        return this.http.post(url,event);
    }
}