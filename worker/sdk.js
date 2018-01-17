const ProcessApp = require("./ProcessApp");
module.exports = {
    run:(entryPoint)=>{
        new ProcessApp(entryPoint).startProcess();
    }
}