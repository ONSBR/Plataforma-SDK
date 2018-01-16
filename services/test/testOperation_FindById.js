const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.operationFindById("2db11684-5212-412a-a126-37f236c044c2").then((op) => { 
    console.log('operation = ', op);
});


