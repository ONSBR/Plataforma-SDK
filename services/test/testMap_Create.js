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

        var mapData = {
            "processId": process[0].id,
            "systemId" : system[0].id,
            "name" : "map 1",
            "content" : "content X"
        }

        api.mapSave(mapData).then(map => {
            console.log("map = ", map);
        });
    });
});