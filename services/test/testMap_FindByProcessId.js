const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

api.mapFindByProcessId("e43fdaa7-92a3-4e36-8be5-709342827c5d").then((map) => { 
    console.log('map = ', map);
});