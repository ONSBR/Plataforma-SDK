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
        this.processMemory = lookup["processMemory"];
    }

    start(){
        return this.processMemory.head(this.instanceId).then(head => {
             var entrypoint = this.dispatcher.listeners[head.event.name];
             return app.start(entrypoint);
        });
    }
}