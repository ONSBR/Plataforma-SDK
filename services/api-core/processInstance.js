
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class ProcessInstance {

    /** Creates a 'ProcessInstance' object
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


    create(processInstance){

        processInstance._metadata = {
            type:"processInstance",
            changeTrack:"create"
        };
        return this.creator.create([processInstance]);
    }

 /**
     * 
     * @param {*} id is the identifier of the operation
     * 
     * @example
 
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

        return this.finder.find('processInstance', criteria, 1);
    }

    /**
     * 
     * @param {*} processId is the identifier of the process that owns the opetations
     * 
     * @example


     */
    findByProcessId(processId){
        var criteria = {
            filterName : "byProcessId",
            parameters:
            [
                {            
                    fieldName : "processId",
                    fieldValue : processId
                }
            ]
        }    

        return this.finder.find('processInstance', criteria);
    }       

}