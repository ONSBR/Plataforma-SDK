module.exports = class MaestroClient{
    constructor(environment,http){
        this.http = http;
        this.env = environment;
    }
    persist(event){
        var d = this.env.maestro;
        var url = `${d.scheme}://${d.host}:${d.port}/v1.0.0/persist/sync`;
        console.log(`persist with maestro`);
        return this.http.post(url,event);
    }
};