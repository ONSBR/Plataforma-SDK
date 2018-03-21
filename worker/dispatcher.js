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
        return this.listeners[event](payload);
        //Promise.all().then(results => (1));
    }
};