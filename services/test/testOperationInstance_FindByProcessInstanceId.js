
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.operationInstanceFindByProcessInstanceId("f3beea6a-5a52-4f62-bcb4-bd03151f59fb").then((opInst) => { 
    console.log('operation instance = ', opInst);
});


