const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

var data = {
    "id" : "f5630f21-51ad-4130-baec-d505c7086f14",
}

api.processInstanceDestroy(data).then((id) => { 
    console.log(id);
});