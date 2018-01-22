const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
}

var api = new ApiCoreFacade(Configuration);

var mapData = {
    "id" : "3c09761a-dc71-493d-ace1-8b3dbd96e906",
}

api.mapDestroy(mapData).then((map) => { 
    console.log('map = ', map);
});