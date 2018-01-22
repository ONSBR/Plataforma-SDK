const ProcessApp = require("./ProcessApp");
const Lookup = require("../ioc/lookup");
module.exports = {
    run: (entryPoint) => {
        //TODO este componente deve instanciar todas as dependencias
        let lookup = new Lookup();
        new ProcessApp(entryPoint,
            lookup["info"],
            lookup["coreFacade"],
            lookup["domainClient"])
            .startProcess();
    }
}