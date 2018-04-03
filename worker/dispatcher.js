const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
let lookup = new Lookup();
const app = new ProcessApp(lookup["info"],
lookup["coreFacade"],
lookup["domainClient"],
lookup["processMemory"],
lookup["eventManager"]);



module.exports = class Dispatcher{
    constructor(){
        this.listeners = {};
        this.lastCount = 0;
    }
    register(eventName, callback){
        this.listeners[eventName] = callback;
    }


    dispatch(event, payload){
        console.log(event);
        var exeEvent ={
            name: event,
            appOrigin: "sdk_node",
            payload: payload
        };
        var executor = lookup["executor"];
        var eventManager = lookup["eventManager"];
        return executor.createInstance(exeEvent).then(instance => {
            console.log("instance created");
            exeEvent.instanceId = instance.id;
            return eventManager.save(exeEvent);
        }).then(()=>{
            console.log("event saved on event store");
            return new Promise((ok,error)=>{
                console.log("execute entrypoint");
                this.listeners[event](scope,ok,error);
            });
        });
    }
};