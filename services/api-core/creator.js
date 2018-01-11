var unirest = require("unirest");

module.exports = class Creator {

    /** Creates a 'Creator' object
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

    /** Inserts a entity into the database
     * 
     * @param {*} data 
     */
    create(data){

        var promise = new Promise((resolve,reject) => {
            var url = this.conf.scheme + "://" + 
            this.conf.host + ":" + 
            this.conf.port + "/core/persist";


            var req = unirest("POST", url);
            
            req.headers({
                "Content-Type": "application/json",
                "Instance-Id": "62141389-2ef2-4715-8675-a670ad7a00cc"
            });
            
            req.type("json");
        
            req.send(data);
            
            req.end(function (res) {                
                if (res.error) {
                    reject(res.Error);
                }
                else {
                    resolve(res.body[0].id)
                }
            });
        });
        return promise;
    }

}