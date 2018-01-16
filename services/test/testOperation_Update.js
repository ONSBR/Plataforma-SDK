const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);


var opData = {
    "id" : "62408c71-02a7-4ae6-b366-1ce7bf5bd159",
    "method": "Plus no more",
}

api.operationSave(opData).then(op => console.log("operation = ", op));