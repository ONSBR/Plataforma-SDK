const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

var systemData = {
    "id" : "945a0af3-f4df-4ff1-a671-4420bc20b3c7",
}

api.systemDestroy(systemData).then((id) => { 
    console.log(id);
});