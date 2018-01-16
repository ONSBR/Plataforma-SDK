const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

var evData = {
    "id" : "0d609684-af9e-4764-b75c-8c135ed6401e",
}

api.eventDestroy(evData).then((ev) => { 
    console.log(ev);
});

