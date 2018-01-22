const HttpClient = require("../http/client");
const DomainClient = require("../services/domain/client");
const CoreFacade = require("../services/api-core/apiCoreFacade");
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
        this.info.processInstanceId = "8b8dcaff-09f6-40b7-b94e-ca6e519e67c4";
        this.info.processId = "61728cac-a576-4643-8e58-82a83b304053";
        this.info.systemId = "ec498841-59e5-47fd-8075-136d79155705";
        this.domainClient = new DomainClient(this.info,this.coreFacade,this.http);
    }


    get(name){
        return this[name];
    }
}