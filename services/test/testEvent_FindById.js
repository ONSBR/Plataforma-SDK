const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

api.eventFindById("dd3724d9-0ea1-4823-ba4d-e6f757a7b338").then((ev) => { 
    console.log('event = ', ev);
});