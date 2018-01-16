const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.systemFindById("92dee4ea-833e-4feb-b5e7-20b5d2132a97").then((system) => { 
    console.log('system = ', system);
});

