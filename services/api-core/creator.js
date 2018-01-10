var unirest = require("unirest");

module.exports = class Create {
    constructor(configuration){
        this.conf = configuration;
    }

/*
[
    {
        "processId": "995d5970-1c56-483f-bf3c-90fdcbc428b7",
        "method": "realizeTransferencia",
        "file":"index.js",
        "_metadata": {
            "type": "operation",
            "changeTrack":"create"
        }
    }
]
*/

    create(data){

        var promise = new Promise((resolve,reject) => {
            var req = unirest("POST", "http://" + this.conf.ip + ":" + this.conf.port + "/core/persist");
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