//import { open } from "inspector";


const System = require("./system");
const Process = require("./process");
const Operation = require("./operation");
const ProcessInstance = require("./processInstance");
const OperationInstance = require("./operationInstance");
const Event = require("./event");
const Map = require("./map");

module.exports = class ApiCoreFacade{
    constructor(configuration){
        this.conf = configuration;
        this.system = new System(configuration);
        this.process = new Process(configuration);
        this.processInstance = new ProcessInstance(configuration);        
        this.operation = new Operation(configuration);
        this.operationInstance = new OperationInstance(configuration);
        this.event = new Event(configuration);
        this.map = new Map(configuration);      
    }

    // ************************************************************************
    //                                SYSTEM
    // ************************************************************************

    /** Creates or updates a 'System' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with 'System' object created or updated
     * 
     * @example for Create
            const ApiCoreFacade = require("../api-core/apiCoreFacade")

            var Configuration = {
                scheme: "http", 
                host: "localhost", 
                port: "9110"
            }

            var api = new ApiCoreFacade(Configuration);

            var systemData = {
                "name": "bank",
                "description": "A Testing Bank App",
                "version":"0.0.13"
            }

            api.systemSave(systemData).then((id) => { 
                console.log(id);
            });
     * 
     * @example for Update
            const ApiCoreFacade = require("../api-core/apiCoreFacade")

            var Configuration = {
                scheme: "http", 
                host: "localhost", 
                port: "9110"
            }

            var api = new ApiCoreFacade(Configuration);

            var systemData = {
                "id" : "945a0af3-f4df-4ff1-a671-4420bc20b3c7",
                "name": "bank",
                "description": "A Testing Bank App",
                "version":"0.0.14"
            }

            api.systemSave(systemData).then((id) => { 
                console.log(id);
            });
     */
    systemSave(system){
        return this.system.save(system);
    }

    /** Finds a 'System' entity based on its id
     * 
     * @param {*} name 
     * 
     * @return a Promisse object containing an array with the 'System' objects found 
     * with @p name 
     * 
     * @example
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);

        api.systemFindByName("bank").then((system) => { 
            console.log('system = ', system);
        });
     */
    systemFindByName(name) {
        return this.system.findByName(name);
    }

    /** Finds a 'System' entity based on its id
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'System' found
     * 
     * @example
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);

        api.systemFindById("92dee4ea-833e-4feb-b5e7-20b5d2132a97").then((system) => { 
            console.log('system = ', system);
        });
     */
    systemFindById(id) {
        return this.system.findById(id);
    }

    /** Destroys a 'System' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'System' object destroyed
     * 
     * Destroy means to set the end of validity
     * 
     * @example
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);

        var systemData = {
            "id" : "945a0af3-f4df-4ff1-a671-4420bc20b3c7",
        }

        api.systemDestroy(systemData).then((id) => { 
            console.log(id);
        });
     * 
     */
    systemDestroy(system) {
        return this.system.destroy(system);
    }

    // ************************************************************************
    //                                PROCESS
    // ************************************************************************

    /** Creates or updates a 'Process' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Process' object created or updated
     * 
     * @example for Create
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);

        var systemData = {
            "name": "bank",
            "description": "A Testing Bank App",
            "version":"0.0.23",
        }

        api.systemSave(systemData).then((system) => { 
            console.log("system id = ", system);
            var procData = {
                "systemId": system[0].id,
                "name": "Transferência",
                "relativePath":"./",
                "deployDate": new Date(),    
            }
            
            api.processSave(procData).then(processId => console.log("processId = ", processId));
        });

     * @example for update
     * 
     *
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);


        var procData = {
            "id" : "b27e9ba9-2850-4f50-87e3-332be84d6763",
            "name": "Transferidor",
        }

        api.processSave(procData).then(processId => console.log("processId = ", processId));

     */
    processSave(process) {
        return this.process.save(process);
    }

    /** Finds a 'Process' entity based on its id
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Process' found
     * 
     * @example
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);

        api.systemFindById("92dee4ea-833e-4feb-b5e7-20b5d2132a97").then((system) => { 
            console.log('system = ', system);
        });
     */
    processFindById(id) {
        return this.process.findById(id);
    }

    /** Finds a 'Process' entity based on a 'System' id
     * 
     * @param {*} systemId 
     * 
     * @return a Promisse object containing an array with the 'Process' found
     * 
     * @example
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);

        api.processFindBySytemId("961e8deb-9400-472b-b354-f58910f5c5c6").then((process) => { 
            console.log('process = ', process);
        });
     */    
    processFindBySytemId(systemId) {
        return this.process.findBySystemId(systemId);
    }

    /** Destroys a 'Process' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Process' object destroyed
     * 
     * Destroy means to set the end of validity
     * 
     * @example
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);

        var processData = {
            "id" : "b27e9ba9-2850-4f50-87e3-332be84d6763",
        }

        api.processDestroy(processData).then((id) => { 
            console.log(id);
        });
     */
    processDestroy(id) {
        return this.process.destroy(id);
    }


    // ************************************************************************
    //                                PROCESS INSTANCE
    // ************************************************************************
    processInstanceSave(processInstance) {
        return this.processInstance.save(processInstance);
    }

    processInstanceDestroy(id) {
        return this.processInstance.destroy(id);
    }

    processInstanceFindById(id) {
        return this.processInstance.findById(id);
    }

    processInstanceFindByProcessId(processId) {
        return this.processInstance.findByProcessId(processId);
    }
    
    // ************************************************************************
    //                                OPERATION
    // ************************************************************************
    operationSave(operation) {
        return this.operation.save(operation);
    }

    operationDestroy(id) {
        return this.operation.destroy(id);
    }

    operationFindById(id) {
        return this.operation.findById(id);
    }

    operationFindByProcessId(processId) {
        return this.operation.findByProcessId(processId);
    }

    // ************************************************************************
    //                                OPERATION INSTANCE
    // ************************************************************************
    operationInstanceSave(operationInstance) {
        return this.operationInstance.save(operationInstance);
    }

    operationInstanceDestroy(id) {
        return this.operationInstance.destroy(id);
    }

    operationInstanceFindById(id) {
        return this.operationInstance.findById(id);
    }

    operationInstanceFindByProcessInstanceId(processInstanceId) {
        return this.operationInstance.findByProcessInstanceId(processInstanceId);
    }

    operationInstanceFindByOperationId(operationId) {
        return this.operationInstance.findByOperationId(processInstanceId);
    }


    // ************************************************************************
    //                                EVENT
    // ************************************************************************
    eventSave(event) {
        return this.event.save(event);
    }

    eventDestroy(id) {
        return this.event.destroy(event);
    }

    eventFindBySystemId(systemId) {
        return this.event.findBySystemId(systemId);
    }

    eventFindById(id) {
        return this.event.findById(id);
    }

    eventFindByProcessId(processId) {
        return this.event.findByProcessId(processId);
    }

    eventFindByName(name) {
        return this.event.findByName(name);
    }

    // ************************************************************************
    //                                MAP
    // ************************************************************************
    mapSave(map) {
        return this.map.save(map);
    }

    mapDestroy(id) {
        return this.map.destroy(map);
    }

    mapFindBySystemId(systemId) {
        return this.map.findBySystemId(systemId);
    }

    mapFindById(id) {
        return this.map.findById(id);
    }

    mapFindByProcessId(processId) {
        return this.map.findByProcessId(processId);
    }

    mapFindByName(name) {
        return this.map.findByName(name);
    }



}