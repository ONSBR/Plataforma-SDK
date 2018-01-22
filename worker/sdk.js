const ProcessApp = require("./ProcessApp");
module.exports = {
    run:(entryPoint)=>{
        //TODO este componente deve instanciar todas as dependencias
        new ProcessApp(entryPoint).startProcess();
    }
}