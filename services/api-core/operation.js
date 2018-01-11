
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class Operation {

    /** Creates a 'Operation' object
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
        this.creator = new Creator(configuration);
        this.finder = new Finder(configuration);
    }

    /**
     * 
     * @param {*} operation is a JSON with this structure:
     * @code
        {
            "processId": process-id,
            "method": process-method,
            "file": process-file,           
        }
     * 
     * @example
            var scheme = "http"
            var host = "localhost";
            var port = "9100";


            const Process = require("../api-core/process")
            const System = require("../api-core/system")
            const Operation = require("../api-core/operation")

            var sysService = new System({scheme: scheme, host:host, port:port});
            var procService = new Process({scheme: scheme, host:host, port:port});
            var operService = new Operation({scheme: scheme, host:host, port:port});

            var systemData = {
                "name": "bank",
                "description": "A Testing Bank App",
                "version":"0.0.4",
            }

            sysService.create(systemData).then((systemId) => { 
                console.log("system id = ", systemId);
                var procData = {
                    "systemId": systemId,
                    "name": "Transferência",
                    "relativePath":"./",
                    "deployDate": new Date(),    
                }
                
                procService.create(procData).then(processId => {
                    console.log("processId = ", processId);

                    var operData = {
                        "processId": processId,
                        "method": "realizeTransferencia",
                        "file":"index.js",           
                    }
                    operService.create(operData).then(operId => {
                        console.log("operId = ", operId)
                    });
                });
            });


     */
    create(operation){

        operation._metadata = {
            type:"operation",
            changeTrack:"create"
        };
        return this.creator.create([operation]);
    }

    /**
     * 
     * @param {*} id is the identifier of the operation
     * 
     * @example
            var scheme = "http"
            var host = "localhost";
            var port = "9100";

            const Operation = require("../api-core/operation")

            var procOperation = new Operation({scheme: scheme, host:host, port:port});

            procOperation.findById("986c8437-5a25-481d-86c5-9cceec8848a2").then((id) => { 
                console.log('operation = ', id);
            });     
     */
    findById(id){
        var criteria = {
            filterName : "byId",
            fieldName : "id",
            fieldValue : id
        }    

        return this.finder.find('operation', criteria, 1);
    }

    /**
     * 
     * @param {*} processId is the identifier of the process that owns the opetations
     * 
     * @example

        var scheme = "http"
        var host = "localhost";
        var port = "9100";

        const Operation = require("../api-core/operation")

        var procOperation = new Operation({scheme: scheme, host:host, port:port});

        procOperation.findByProcessId("6e4c0d35-99a0-4262-9715-f7bfb1d25e09").then((list) => { 
            console.log('operations = ', list);
        });
     */
    findByProcessId(processId){
        var criteria = {
            filterName : "byProcessId",
            fieldName : "processId",
            fieldValue : processId
        }    

        return this.finder.find('operation', criteria);
    }    

}