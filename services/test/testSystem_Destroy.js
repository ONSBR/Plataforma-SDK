if (process.argv.length < 3) {
    console.log("Syntax: node", process.argv[1], "id");
    return;
}
const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

var systemData = {
    "id" : process.argv[2],
}

api.systemDestroy(systemData).then((id) => { 
    console.log(id);
});