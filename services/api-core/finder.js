

var unirest = require("unirest");

module.exports = class Finder {
    constructor(configuration){
        this.conf = configuration;
    }

    // entity: entity name, like 'system'
    all(entityName) {

        var promise = new Promise((resolve,reject) => {
            var req = unirest("GET"
            , "http://" + this.conf.ip + ":" + this.conf.port + "/core/" + entityName);
            //console.log("req = ", req);
            req.headers({
                "Instance-Id": "62141389-2ef2-4715-8675-a670ad7a00cc"
            });
            
            req.end(function (res) {
                if (res.error) {
                    reject(res.Error);
                }
                else {
                    resolve(res.body)
                }
              });
              
        });
        return promise;
    }

    find(entityName, criteria) {
        var promise = new Promise((resolve,reject) => {
            //filter=byName&nome=Phlippe
            var req = unirest("GET"
            , "http://" + this.conf.ip + ":" + this.conf.port + "/core/" + entityName + 
            "?filter=" + criteria.filterName + "&" + 
            criteria.fieldName + "=" + fieldValue);

            //console.log("req = ", req);
            req.headers({
                "Instance-Id": "62141389-2ef2-4715-8675-a670ad7a00cc"
            });
            
            req.end(function (res) {
                if (res.error) {
                    reject(res.Error);
                }
                else {
                    resolve(res.body)
                }
              });
              
        });
        return promise;
    }
}        


