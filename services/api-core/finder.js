

var unirest = require("unirest");

module.exports = class Finder {

    /** Creates a 'Finder' object
     * 
     * @param {*} configuration is a JSON with this structure:
     * @code
        {
            scheme: scheme, 
            host:host, 
            port:port
        }
     *
     * @example
        {
            scheme: 'http', 
            host: 'localhost', 
            port: '9100'
        } 
     */ 
    constructor(configuration){
        this.conf = configuration;        
    }


    /** Finds all objects of a certain entity
     * 
     * @param {*} entityName is a string with the name of the entity
     */
    all(entityName) {

        var promise = new Promise((resolve,reject) => {
            url = this.conf.scheme + "://" + 
            this.conf.host + ":" +
            this.conf.port + "/core/" + entityName;       

            var req = unirest("GET", url);
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

    /** Finds all (or one) objects of a certain entity, that satisfies
     * a criteria
     * 
     * @param {*} entityName is the name of the entity
     * @param {*} criteria defines the search criteria. It is a JSON with this 
     * structure:
     * @code
        {
            filterName : filter-name,
            fieldName : field-name,
            fieldValue : field-value
        }    
     * @example
     * 
        var criteria = {
            filterName : "byId",
            fieldName : "id",
            fieldValue : id
        }    
     *
     * @param {*} only_one defines if one wants all the objects, when it should be 
     * set to 0, the default; or just the first, when it should be set to 1
     * 
     */
    find(entityName, criteria, only_one = 0) {
        var promise = new Promise((resolve,reject) => {
            var url = this.conf.scheme + "://" 
            + this.conf.host + ":" 
            + this.conf.port + "/core/" + entityName + 
            "?filter=" + criteria.filterName + "&" + 
            criteria.fieldName + "=" + criteria.fieldValue;            

            var req = unirest("GET", url);

            //console.log("req = ", req);
            req.headers({
                "Instance-Id": "62141389-2ef2-4715-8675-a670ad7a00cc"
            });
            
            req.end(function (res) {
                if (res.error) {
                    reject(res.Error);
                }
                else {
                    if (only_one == 1)
                        resolve(res.body[0])
                    else 
                        resolve(res.body)
                }
              });
              
        });
        return promise;
    }
}        


