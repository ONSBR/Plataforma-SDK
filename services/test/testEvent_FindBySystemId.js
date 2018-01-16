const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.eventFindBySystemId("da95ebfd-2b0e-40e0-bd99-2245f3fe7dd8").then((ev) => { 
    console.log('event = ', ev);
});