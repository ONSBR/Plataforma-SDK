const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.mapFindById("3c09761a-dc71-493d-ace1-8b3dbd96e906").then((op) => { 
    console.log('map = ', op);
});
