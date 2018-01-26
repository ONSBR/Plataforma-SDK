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
            scheme: process.env.COREAPI_SCHEME || "http",
            host: process.env.COREAPI_HOST || "apicore",
            port: process.env.COREAPI_PORT || "9110"
        });
        this.info = {};
        this.info.processInstanceId = process.env.INSTANCE_ID;
        this.info.processId = process.env.PROCESS_ID;
        this.info.systemId = process.env.SYSTEM_ID;
        this.info.processMemory = {
            host: process.env.PROCESS_MEMORY_HOST || "process_memory",
            scheme: process.env.PROCESS_MEMORY_SCHEME || "http",
            port: process.env.PROCESS_MEMORY_PORT || "9091"
        }

        this.info.eventManager = {
            host: process.env.EVENT_MANAGER_HOST || "event_manager",
            scheme: process.env.EVENT_MANAGER_SCHEME || "http",
            port: process.env.EVENT_MANAGER_PORT || "8081"
        };
        this.domainClient = new DomainClient(this.info,this.coreFacade,this.http);
        this.processMemory = new ProcessMemory(this.info,this.http);
        this.eventManager = new EventManager(this.info,this.http);
    }


    get(name){
        return this[name];
    }
}
