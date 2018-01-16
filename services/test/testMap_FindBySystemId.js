const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9110"
}

var api = new ApiCoreFacade(Configuration);

api.mapFindBySystemId("95c14320-b750-4e59-8954-466dfac019a0").then((map) => { 
    console.log('map = ', map);
});
