const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.processInstanceFindById("468da502-7975-4b51-adf1-ea7a732b2281").then((system) => { 
    console.log('system = ', system);
});