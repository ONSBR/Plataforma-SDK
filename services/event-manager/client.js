module.exports = class EventManagerClient{
    constructor(environment, httpClient){
        this.http = httpClient;
        this.env = environment;
    }

    emit(event){
        if(!event.name){
            throw new Error("Event name is required");
        }
        if(!event.payload){
            throw new Error("Event payload is required");
        }
        var c = this.env.eventManager;
        var url = `${c.scheme}://${c.host}:${c.port}/sendevent`;
        return this.http.put(url,event);
    }
}