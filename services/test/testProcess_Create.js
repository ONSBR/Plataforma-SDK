
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

var systemData = {
    "name": "bank",
    "description": "A Testing Bank App",
    "version":"0.0.23",
}

api.systemSave(systemData).then((system) => { 
    console.log("system id = ", system);
    var procData = {
        "systemId": system[0].id,
        "name": "Transferência",
        "relativePath":"./",
        "deployDate": new Date(),    
    }
    
    api.processSave(procData).then(processId => console.log("processId = ", processId));
});

