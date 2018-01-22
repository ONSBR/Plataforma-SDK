const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

api.operationFindByProcessId("411e552b-d047-4aa3-9d90-e77940fd0866").then((op) => { 
    console.log('operation = ', op);
});
