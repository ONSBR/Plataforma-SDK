const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.eventFindByProcessId("b1810e64-fbf7-4877-88b5-ddb41b9679ed").then((ev) => { 
    console.log('event = ', ev);
});