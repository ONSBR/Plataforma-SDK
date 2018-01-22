const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);


var systemData = {
    "name": "bank",
    "description": "A Testing Bank App",
    "version":"0.0.6",
}

api.systemSave(systemData).then((system) => { 
    console.log("system = ", system);
    var procData = {
        "systemId": system[0].id,
        "name": "Transferência",
        "relativePath":"./",
        "deployDate": new Date(),    
    }
    
    api.processSave(procData).then(process => {
        console.log("process = ", process);

        var opData = {
            "processId": process[0].id,
            "systemId" : system[0].id,
            "method" : "Plus",
            "file" : "Plus.js"
        }

        api.operationSave(opData).then(operation => {
            console.log("operation = ", operation);
        });
    });
});