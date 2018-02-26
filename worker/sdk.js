const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
let lookup = new Lookup();
const app = new ProcessApp(lookup["info"],
lookup["coreFacade"],
lookup["domainClient"],
lookup["processMemory"],
lookup["eventManager"]);

module.exports = {
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
    }
};