
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.processFindBySytemId("961e8deb-9400-472b-b354-f58910f5c5c6").then((process) => { 
    console.log('process = ', process);
});

