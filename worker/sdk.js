const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
const Task = require("./task");
let lookup = new Lookup();
const app = new ProcessApp(lookup["info"],
lookup["coreFacade"],
lookup["domainClient"],
lookup["processMemory"],
lookup["eventManager"]);


class Resolver  {
    constructor(dispatcher){
        this.dispatcher = dispatcher;
    }

    serve(entryPoint){
        if (typeof entryPoint === "function"){
            if (process.env.API_MODE){
                entryPoint();
            }else{
                return new Task(this.dispatcher, lookup["info"].processInstanceId).start();
            }
        }else{
            throw new Error("entrypoint should be a function");
        }
    }
};

module.exports = (function() {
    var self = {
        run: (entryPoint) => {
            app.start(entryPoint).catch(e => {
                console.log(e);
            });
        },

        mount:(mountingPoint)=>{
            if (typeof mountingPoint !== "function"){
                console.log("mountingPoint expected: Function");
                console.log("got:");
                console.log(mountingPoint);
                return;
            }
            app.loadDataFromDomain = mountingPoint;
        },

        bind:(dispatcher)=>{
            return new Resolver(dispatcher);
        }
    };
    return self;
})();