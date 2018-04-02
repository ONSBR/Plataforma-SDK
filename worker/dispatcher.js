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
        var exeEvent ={
            name: event,
            appOrigin: "sdk_node",
            payload: payload
        };
        var executor = lookup["executor"];
        var eventManager = lookup["eventManager"];
        executor.createInstance(exeEvent).then(instance => {
            exeEvent.instanceId = instance.id;
            return eventManager.save(exeEvent);
        }).then(()=>{
            return new Promise((ok,error)=>{
                var scope = {
                    params:payload,
                    event:exeEvent,
                    bind:(b)=>b
                }
                this.listeners[event](scope,ok,error);
            });
        }).catch(e => {console.log(e);});
    }
};