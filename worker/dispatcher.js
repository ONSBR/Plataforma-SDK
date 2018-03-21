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
        app.start(entryPoint).catch(e => {
            console.log(e);
        });

    }
    register(eventName, callback){
        if (!this.listeners[eventName]){
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }


    dispatch(event, payload){
        Promise.all(this.listeners[event]).then(results => (1));
    }
};