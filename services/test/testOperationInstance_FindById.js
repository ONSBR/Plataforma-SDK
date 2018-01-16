const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110",
    referenceDate : 1516029866000

}

var api = new ApiCoreFacade(Configuration);

api.operationInstanceFindById("e55178a9-fff5-4f74-826e-3abc49a65a8b").then((opInst) => { 
    console.log('operation instance = ', opInst);
});
