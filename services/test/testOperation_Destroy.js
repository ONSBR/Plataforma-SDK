const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

var opData = {
    "id" : "22f7933c-e88c-4182-ba7f-45c747840175",
}

api.operationDestroy(opData).then((op) => { 
    console.log(op);
});