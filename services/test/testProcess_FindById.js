const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.processFindById("b27e9ba9-2850-4f50-87e3-332be84d6763").then((process) => { 
    console.log('process = ', process);
});

