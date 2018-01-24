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
    console.log("system id = ", system);
    var instAppData = {
        "systemId": system[0].id,
        "host": "172.19.0.1",
        "port" : "90456",
        "name":"any name",
        "type" : "any type"
    }
    
    api.installedAppSave(instAppData).then(installedApp => {
        console.log("installedApp = ", installedApp);
    });
});