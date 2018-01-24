const HttpClient = require("../http/client");
const DomainClient = require("../services/domain/client");
const CoreFacade = require("../services/api-core/apiCoreFacade");
const ProcessMemory = require("../services/process-memory/client");
const EventManager = require("../services/event-manager/client");
module.exports = class LookupServices{
    constructor(){
        //crias todas as dependencias stateless
        this.http = new HttpClient();
        this.coreFacade = new CoreFacade({
            scheme: "http",
            host: "localhost",
            port: "9100"
        });
        this.info = {};
        this.info.processInstanceId = "instancia_teste";
        this.info.processId = "61728cac-a576-4643-8e58-82a83b304053";
        this.info.systemId = "ec498841-59e5-47fd-8075-136d79155705";
        this.info.processMemory = {
            host:"localhost",
            scheme:"http",
            port:"9091"
        }

        this.info.eventManager = {
            host:"localhost",
            scheme:"http",
            port:"8081"
        }
        this.domainClient = new DomainClient(this.info,this.coreFacade,this.http);
        this.processMemory = new ProcessMemory(this.info,this.http);
        this.eventManager = new EventManager(this.info,this.http);
    }


    get(name){
        return this[name];
    }
}