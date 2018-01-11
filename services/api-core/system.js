
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class System {

    /** Creates a 'System' object
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


    /** Inserts a 'system' object into the database
     * 
     * @param {*} system is a JSON with this structure:
     * 
     * @example
     *
        var scheme = "http";
        var host = "localhost";
        var port = "9100";

        const System = require("../api-core/system")

        var sysService = new System({scheme: scheme, host:host, port:port});

        var systemData = {
            "name": "bank",
            "description": "A Testing Bank App",
            "version":"0.0.11"
        }

        sysService.create(systemData).then((id) => { 
            console.log(id);
        });   
     *
     */
    create(system){

        system._metadata = {
            type:"system",
            changeTrack:"create"
        };
        
        return this.creator.create([system]);
    }

  
    /** Finds all 'system' objects with a certain name
     * 
     * @param name is the name of the sytem
     * 
     * @returns 'Promisse' with a list of 'system' objects
     * 
     * @example
     * 
        var scheme = "http"
        var host = "localhost";
        var port = "9100";

        const System = require("../api-core/system")

        var sysService = new System({scheme: scheme, host:host, port:port});

        sysService.findByName('bank').then((list) => { 
            console.log(list);
        });
     *
     */
    findByName(name) {
        var criteria = {
            filterName : "byName",
            fieldName : "name",
            fieldValue : name
        }
        return this.finder.find('system', criteria);
    }

    /** Finds a 'system' objects with a certain id
     * 
     * @param name is the name of the sytem
     * 
     * @param a 'Promisse' with the 'system' object
     * 
     * @example     
     * 
        var scheme = "http"
        var host = "localhost";
        var port = "9100";

        const System = require("../api-core/system")

        var sysService = new System({scheme: scheme, host:host, port:port});

        sysService.findById("1d31c58e-a211-43e7-bd45-3447f3f98b53").then((system) => { 
            console.log('system = ', system);
        });
     *
     * \endcode
     */
    findById(id) {
        var criteria = {
            filterName : "byId",
            fieldName : "id",
            fieldValue : id
        }
        
        return this.finder.find('system', criteria, 1)

    }    

}