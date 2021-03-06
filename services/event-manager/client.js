module.exports = class EventManagerClient{
    constructor(environment, httpClient){
        this.http = httpClient;
        this.env = environment;
    }

    validEvent(event){
        if(!event.name){
            throw new Error("Event name is required");
        }
        if(!event.payload){
            throw new Error("Event payload is required");
        }
        if (this.scope){
            event.scope = this.scope;
        }
    }
    emit(event){
        this.validEvent(event);
        var c = this.env.eventManager;
        var url = `${c.scheme}://${c.host}:${c.port}/sendevent`;
        return this.http.put(url,event);
    }

    save(event){
        this.validEvent(event);
        var c = this.env.eventManager;
        var url = `${c.scheme}://${c.host}:${c.port}/save`;
        return this.http.post(url,event);
    }
}