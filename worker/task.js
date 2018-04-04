const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
let lookup = new Lookup();
const app = new ProcessApp(lookup["info"],
lookup["coreFacade"],
lookup["domainClient"],
lookup["processMemory"],
lookup["eventManager"]);

module.exports = class Task {
    constructor(dispatcher, instanceId){
        this.dispatcher = dispatcher;
        this.instanceId = instanceId;
    }

    start(){
        return this.processMemory.head(this.processInstanceId).then(head => {
            console.log(head);
        });
    }
}