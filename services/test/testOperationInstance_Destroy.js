
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

var opData = {
    "id" : "9c8f4ee2-7e80-466e-8427-b8138a41fac3",
}

api.operationInstanceDestroy(opData).then((op) => { 
    console.log(op);
});
