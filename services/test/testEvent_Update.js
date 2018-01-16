const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);


var eventData = {
    "id" : "dd3724d9-0ea1-4823-ba4d-e6f757a7b338",
    "direction": "out",
}

api.eventSave(eventData).then(event => console.log("event = ", event));