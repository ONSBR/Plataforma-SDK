const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
let lookup = new Lookup();
const app = new ProcessApp(lookup["info"],
lookup["coreFacade"],
lookup["domainClient"],
lookup["processMemory"],
lookup["eventManager"]);

module.exports = class Runner {
    constructor(instanceId){
        if (!instanceId){
            //Cria uma instancia de processo na ApiCore
            //Cria uma instancia de operacao

        }
    }

    run(entrypoint){
        return app.start(new Promise(res,rej => {

        }));
    }
}