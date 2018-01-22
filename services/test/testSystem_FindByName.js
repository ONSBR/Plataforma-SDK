if (process.argv.length < 3) {
    console.log("Syntax: node", process.argv[1], "name");
    return;
}

const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

api.systemFindByName(process.argv[2]).then((system) => { 
    console.log('system = ', system);
});