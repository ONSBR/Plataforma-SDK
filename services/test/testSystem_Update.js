if (process.argv.length < 4) {
    console.log("Syntax: node", process.argv[1], "id new-desc");
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
    "name": "bank",
    "description": process.argv[3],
    "version":"0.0.14"
}

api.systemSave(systemData).then((id) => { 
    console.log(id);
});
