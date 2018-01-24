const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

api.operationInstanceFindByOperationId("94ef1d10-cc77-4ac8-afbf-589dc63380ee").then((opInst) => { 
    console.log('operation instance = ', opInst);
});