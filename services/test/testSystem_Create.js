
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
    "version":"0.0.21"
}

api.systemSave(systemData).then((system) => { 
    console.log("system = ", system);
});

