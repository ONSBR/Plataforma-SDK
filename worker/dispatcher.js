const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
let lookup = new Lookup();




module.exports = class Dispatcher {
    constructor() {
        this.listeners = {};
        this.lastCount = 0;
    }
    register(eventName, callback) {
        this.listeners[eventName] = callback;
    }


    dispatch(event, payload) {
        if (!this.listeners[event]){
            console.log("Event has no subscribers");
            return;
        }
        console.log(event);
        var exeEvent = {
            name: event,
            appOrigin: "sdk_node",
            payload: payload
        };
        var executor = lookup["executor"];
        var eventManager = lookup["eventManager"];
        var processInstance = {};
        return executor.createInstance(exeEvent).then(instance => {
            console.log("instance created");
            processInstance = instance;
            exeEvent.instanceId = instance.id;
            return eventManager.save(exeEvent);
        }).then(() => {
            var info = {
                "systemId": processInstance.systemId,
                "processInstanceId": processInstance.id,
                "processId": processInstance.processId
            };
            const app = new ProcessApp(info,
                lookup["coreFacade"],
                lookup["domainClient"],
                lookup["processMemory"],
                lookup["eventManager"]);
            console.log("event saved on event store");
            return app.start(this.listeners[event]);
        });
    }
};