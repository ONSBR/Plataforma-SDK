module.exports = {
    run:(entryPoint)=>{
        new ProcessApp(entryPoint).startProcess();
    }
}