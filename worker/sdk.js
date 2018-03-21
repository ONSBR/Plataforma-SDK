const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
let lookup = new Lookup();
const app = new ProcessApp(lookup["info"],
lookup["coreFacade"],
lookup["domainClient"],
lookup["processMemory"],
lookup["eventManager"]);


const Resolver = {
    serve:(entryPoint)=>{
        console.log(entryPoint);
        console.log(process.env.API_MODE);
        if (typeof entryPoint === "function"){
            if (process.env.API_MODE == true)
                entryPoint();
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
            self.dispatcher = dispatcher;
            return Resolver;
        }
    };
    return self;
})();