
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.processInstanceFindByProcessId("f83c952a-5308-458a-a8db-61129d990464").then((system) => { 
    console.log('system = ', system);
});

