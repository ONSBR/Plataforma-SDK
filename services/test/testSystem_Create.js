
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
    "version":"0.0.13"
}

api.systemSave(systemData).then((id) => { 
    console.log(id);
});

