
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
    "version":"0.0.23",
}

api.systemSave(systemData).then((system) => { 
    console.log("system = ", system);
    var presentationData = {
        "systemId": system[0].id,
        "name": "Transferência",
        "url" : "url 1"
    }
    
    api.presentationSave(presentationData).then(presentation => console.log("presentation = ", presentation));
});

