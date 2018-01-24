
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);


var procData = {
    "id" : "b27e9ba9-2850-4f50-87e3-332be84d6763",
    "name": "Transferidor",
}

api.processSave(procData).then(processId => console.log("processId = ", processId));


