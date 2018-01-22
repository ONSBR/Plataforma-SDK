
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);


var procInstData = {
    "id" : "f5630f21-51ad-4130-baec-d505c7086f14",
    "status": "aborted",
}

api.processInstanceSave(procInstData).then(processInstance => console.log("processInstance = ", processInstance));
