const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);


var opInstData = {
    "id" : "e55178a9-fff5-4f74-826e-3abc49a65a8b",
    "must_commit": false,
}

api.operationInstanceSave(opInstData).then(opInst => console.log("operation instance = ", opInst));