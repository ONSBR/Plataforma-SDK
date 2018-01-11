
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class Process {


    /** Creates a 'Process' object
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

    /** Inserts a 'process' object into the database
     * 
     * @param {*} system is a JSON with this structure:
     * @code
        {
            "systemId": system-id-of-this-process,
            "name": process-name,
            "relativePath": process-relative-path
            "deployDate": process-deplu-date,    
        }
     * @example
     *
        var scheme = "http"
        var host = "localhost";
        var port = "9100";


        const Process = require("../api-core/process")
        const System = require("../api-core/system")

        var sysService = new System({scheme: scheme, host:host, port:port});
        var procService = new Process({scheme: scheme, host:host, port:port});

        var systemData = {
            "name": "bank",
            "description": "A Testing Bank App",
            "version":"0.0.23",
        }

        sysService.create(systemData).then((systemId) => { 
            console.log("system id = ", systemId);
            var procData = {
                "systemId": systemId,
                "name": "Transferência",
                "relativePath":"./",
                "deployDate": new Date(),    
            }
            
            procService.create(procData).then(processId => console.log("processId = ", processId));
        });  
     *
     */
    create(process){

        process._metadata = {
            type:"process",
            changeTrack:"create"
        };
        return this.creator.create([process]);
    }



    /** Returns a 'Promise' with a list with the processes of a certain system
     * 
     * @param {*} systemId is the system identifier
     */
    findBySytemId(systemId){
        var criteria = {
            filterName : "bySystemId",
            parameters :
            [
                {
                    fieldName : "systemId",
                    fieldValue : systemId
                }
            ]            
        }        
        return this.finder.find('process', criteria);

    }

    /** Returns a 'Promisse' with an object with a certain id
     * 
     * @param {*} id is the process identifier
     */
    findById(id){
        var criteria = {
            filterName : "byId",
            parameters:
            [
                {
                    fieldName : "id",
                    fieldValue : id
                }
            ]
        }        
        return this.finder.find('process', criteria, 1);
    }    

}