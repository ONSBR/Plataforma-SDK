//import { open } from "inspector";


const System = require("./system");
const Process = require("./process");
const Operation = require("./operation");
const ProcessInstance = require("./processInstance");
const OperationInstance = require("./operationInstance");
const Event = require("./event");
const Map = require("./map");
const InstalledApp = require("./installedApp");


module.exports = class ApiCoreFacade{

    /** constructor
     * 
     * Configuration is a structure defining the scheme, the host and the port 
     * of Api.Core service.
     * 
     * 
     @example
     {
        scheme: "http", 
        host: "localhost", 
        port: "9110"         
     }

    * It may define the date of validity, as a timestamp to be used
    {
        scheme: "http", 
        host: "localhost", 
        port: "9110"         
        referenceDate : 1516037065000
     }
     * 
     */   
    constructor(configuration){
        this.conf = configuration;
        this.system = new System(configuration);
        this.process = new Process(configuration);
        this.processInstance = new ProcessInstance(configuration);        
        this.operation = new Operation(configuration);
        this.operationInstance = new OperationInstance(configuration);
        this.event = new Event(configuration);
        this.map = new Map(configuration);  
        this.installedApp = new InstalledApp(configuration);
    }

    // ************************************************************************
    //                                SYSTEM
    // ************************************************************************

    /** Creates or updates a 'System' entity
     * 
     * @param {*} system 
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
     * @param {*} process 
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

    /** Creates or updates a 'ProcessInstance' entity
     * 
     * @param {*} processInstance 
     * 
     * @return a Promisse object containing an array with the 'ProcessInstance' object created or updated
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
            "version":"0.0.6",
        }

        api.systemSave(systemData).then((system) => { 
            console.log("system id = ", system);
            var procData = {
                "systemId": system[0].id,
                "name": "Transferência",
                "relativePath":"./",
                "deployDate": new Date(),    
            }
            
            api.processSave(procData).then(process => {
                console.log("process = ", process);

                var procInstData = {
                    "processId": process[0].id,
                    "startExecution": new Date(),
                    "endExecution": new Date(),
                    "referenceDate": new Date(),
                    "status":"pending",            
                }

                api.processInstanceSave(procInstData).then(processInst => {
                    console.log("processInst = ", processInst);
                });
            });
        });
     *
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
     *
     */
    processInstanceSave(processInstance) {
        return this.processInstance.save(processInstance);
    }

    /** Destroys a 'ProcessInstance' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'ProcessInstance' object destroyed
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

        var data = {
            "id" : "f5630f21-51ad-4130-baec-d505c7086f14",
        }

        api.processInstanceDestroy(data).then((id) => { 
            console.log(id);
        });
     */    
    processInstanceDestroy(id) {
        return this.processInstance.destroy(id);
    }

    /** Finds a 'ProcessInstance' entity based on its id
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'ProcessInstance' found
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

        api.processInstanceFindById("468da502-7975-4b51-adf1-ea7a732b2281").then((system) => { 
            console.log('system = ', system);
        });
     */    
    processInstanceFindById(id) {
        return this.processInstance.findById(id);
    }

    /** Finds a 'ProcessInstance' entity based on the 'Process' that it is related to
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'ProcessInstance' found
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

        api.processInstanceFindByProcessId("f83c952a-5308-458a-a8db-61129d990464").then((system) => { 
            console.log('system = ', system);
        });
     */
    processInstanceFindByProcessId(processId) {
        return this.processInstance.findByProcessId(processId);
    }
  
    // ************************************************************************
    //                                OPERATION
    // ************************************************************************

    /** Creates or updates an 'Operation' entity
     * 
     * @param {*} operation 
     * 
     * @return a Promisse object containing an array with the 'Operation' object created or updated
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
            "version":"0.0.6",
        }

        api.systemSave(systemData).then((system) => { 
            console.log("system id = ", system);
            var procData = {
                "systemId": system[0].id,
                "name": "Transferência",
                "relativePath":"./",
                "deployDate": new Date(),    
            }
            
            api.processSave(procData).then(process => {
                console.log("process = ", process);

                var opData = {
                    "processId": process[0].id,
                    "systemId" : system[0].id,
                    "method" : "Plus",
                    "file" : "Plus.js"
                }

                api.operationSave(opData).then(operation => {
                    console.log("operation = ", operation);
                });
            });
        });
     *
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


        var opData = {
            "id" : "22f7933c-e88c-4182-ba7f-45c747840175",
            "method": "PlusMore",
            "file" : "PluseMore.js"
        }

        api.operationSave(opData).then(op => console.log("operation = ", op));
     *
     */    
    operationSave(operation) {
        return this.operation.save(operation);
    }

    /** Destroys a 'Operation' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Operation' object destroyed
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

        var opData = {
            "id" : "22f7933c-e88c-4182-ba7f-45c747840175",
        }

        api.operationDestroy(opData).then((op) => { 
            console.log(op);
        });
     */        
    operationDestroy(id) {
        return this.operation.destroy(id);
    }

    /** Finds a 'Operation' entity based on its id
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Operation' found
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

        api.operationFindById("22f7933c-e88c-4182-ba7f-45c747840175").then((op) => { 
            console.log('operation = ', op);
        });
     */
    operationFindById(id) {
        return this.operation.findById(id);
    }

    /** Finds a 'Operation' entity based on the 'Process' that it is related to
     * 
     * @param {*} processId 
     * 
     * @return a Promisse object containing an array with the 'Operation' found
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

        api.operationFindByProcessId("411e552b-d047-4aa3-9d90-e77940fd0866").then((op) => { 
            console.log('operation = ', op);
        });
     */    
    operationFindByProcessId(processId) {
        return this.operation.findByProcessId(processId);
    }

    // ************************************************************************
    //                                OPERATION INSTANCE
    // ************************************************************************
    
    /** Creates or updates an 'OperationInstance' entity
     * 
     * @param {*} operationInstance
     * 
     * @return a Promisse object containing an array with the 'OperationInstance' object created or updated
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
            "version":"0.0.9",
        }

        api.systemSave(systemData).then((system) => { 
            console.log("system = ", system);
            var procData = {
                "systemId": system[0].id,
                "name": "Transferência",
                "relativePath":"./",
                "deployDate": new Date(),    
            }
            
            api.processSave(procData).then(process => {
                console.log("process = ", process);

                // process instance
                var procInstData = {
                    "processId": process[0].id,
                    "startExecution": new Date(),
                    "endExecution": new Date(),
                    "referenceDate": new Date(),
                    "status":"pending",            
                }
                var promisseProcInst =  api.processInstanceSave(procInstData);

                // operation
                var operData = {
                    "processId": process[0].id,
                    "method": "realizeTransferencia",
                    "file":"index.js",           
                }
                var promisseOper = api.operationSave(operData);

                Promise.all([promisseProcInst, promisseOper]).then(ids => {

                    console.log("processInstance = ", ids[0]);
                    console.log("processInstanceId = ", ids[0][0].id);

                    console.log("operation = ", ids[1]);
                    console.log("operationId = ", ids[1][0].id);

                    // operation instance            
                    var operInstData = {
                        "processInstanceId": ids[0][0].id,
                        "operationId": ids[1][0].id,
                        "mustCommit": true,
                        "status":"pending",                    
                    }
                    api.operationInstanceSave(operInstData).then(operInst => {
                        console.log("operInst = ", operInst);
                    }); 
                });        
            });
        });

   
     *
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


        var opInstData = {
            "id" : "e55178a9-fff5-4f74-826e-3abc49a65a8b",
            "must_commit": false,
        }

        api.operationInstanceSave(opInstData).then(opInst => console.log("operation instance = ", opInst));
     *
     */     

    operationInstanceSave(operationInstance) {
        return this.operationInstance.save(operationInstance);
    }

    /** Destroys a 'Operation' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Operation' object destroyed
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

        var opData = {
            "id" : "9c8f4ee2-7e80-466e-8427-b8138a41fac3",
        }

        api.operationInstanceDestroy(opData).then((op) => { 
            console.log(op);
        });
     */     
    operationInstanceDestroy(id) {
        return this.operationInstance.destroy(id);
    }


    /** Finds a 'OperationInstance' entity based on its id
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'OperationInstance' found
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

        api.operationFindById("22f7933c-e88c-4182-ba7f-45c747840175").then((op) => { 
            console.log('operation = ', op);
        });
     */    
    operationInstanceFindById(id) {
        return this.operationInstance.findById(id);
    }

    /** Finds a 'OperationInstance' entity based on the process instance it is related ti
     * 
     * @param {*} processInstanceId 
     * 
     * @return a Promisse object containing an array with the 'OperationInstance' found
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

        api.operationInstanceFindByProcessInstanceId("f3beea6a-5a52-4f62-bcb4-bd03151f59fb").then((opInst) => { 
            console.log('operation instance = ', opInst);
        });
     */   
    operationInstanceFindByProcessInstanceId(processInstanceId) {
        return this.operationInstance.findByProcessInstanceId(processInstanceId);
    }

    /** Finds a 'OperationInstance' entity based on the operation it is related ti
     * 
     * @param {*} processInstanceId 
     * 
     * @return a Promisse object containing an array with the 'OperationInstance' found
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

        api.operationInstanceFindByOperationId("94ef1d10-cc77-4ac8-afbf-589dc63380ee").then((opInst) => { 
            console.log('operation instance = ', opInst);
        });
     */       
    operationInstanceFindByOperationId(operationId) {
        return this.operationInstance.findByOperationId(operationId);
    }


    // ************************************************************************
    //                                EVENT
    // ************************************************************************

    /** Creates or updates an 'Event' entity
     * 
     * @param {*} event
     * 
     * @return a Promisse object containing an array with the 'Event' object created or updated
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
            "version":"0.0.6",
        }

        api.systemSave(systemData).then((system) => { 
            console.log("system id = ", system);
            var procData = {
                "systemId": system[0].id,
                "name": "Transferência",
                "relativePath":"./",
                "deployDate": new Date(),    
            }
            
            api.processSave(procData).then(process => {
                console.log("process = ", process);

                var opData = {
                    "processId": process[0].id,
                    "systemId" : system[0].id,
                    "method" : "Plus",
                    "file" : "Plus.js"
                }

                api.operationSave(opData).then(operation => {
                    console.log("operation = ", operation);

                    var eventData = { 
                        "name" : "eventA",
                        "direction" : "in",
                        "operation_id" : operation[0].id,
                        "processId": process[0].id,
                        "systemId" : system[0].id    
                    }

                    api.eventSave(eventData).then(event => {
                        console.log("event = ", event);
                    });
                });
            });
        });
     * 
     * @example for Update
     * 
        const ApiCoreFacade = require("../api-core/apiCoreFacade")

        var Configuration = {
            scheme: "http", 
            host: "localhost", 
            port: "9110"
        }

        var api = new ApiCoreFacade(Configuration);


        var eventData = {
            "id" : "dd3724d9-0ea1-4823-ba4d-e6f757a7b338",
            "direction": "out",
        }

        api.eventSave(eventData).then(event => console.log("event = ", event));
     */    
    eventSave(event) {
        return this.event.save(event);
    }

    /** Destroys a 'Event' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Event' object destroyed
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

        var evData = {
            "id" : "0d609684-af9e-4764-b75c-8c135ed6401e",
        }

        api.eventDestroy(evData).then((ev) => { 
            console.log(ev);
        });
     */            
    eventDestroy(id) {
        return this.event.destroy(id);
    }

    /** Finds an 'Event' entity based on its id
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Event' found
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

        api.eventFindById("dd3724d9-0ea1-4823-ba4d-e6f757a7b338").then((ev) => { 
            console.log('event = ', ev);
        });
     */    
    eventFindById(id) {
        return this.event.findById(id);
    }

    /** Finds an 'Event' entity based on the process it is associated to
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Event' found
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

        api.eventFindByProcessId("b1810e64-fbf7-4877-88b5-ddb41b9679ed").then((ev) => { 
            console.log('event = ', ev);
        });
     */    
    eventFindByProcessId(processId) {
        return this.event.findByProcessId(processId);
    }


    /** Finds an 'Event' entity based on its name
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Event' found
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

        api.eventFindByName("eventA").then((ev) => { 
            console.log('event = ', ev);
        });
     */       
    eventFindByName(name) {
        return this.event.findByName(name);
    }


    /** Finds an 'Event' entity based on its name
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Event' found
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

        api.eventFindBySystemId("da95ebfd-2b0e-40e0-bd99-2245f3fe7dd8").then((ev) => { 
            console.log('event = ', ev);
        });
     */           
    eventFindBySystemId(systemId) {
        return this.event.findBySystemId(systemId);
    }

    

    // ************************************************************************
    //                                MAP
    // ************************************************************************

    /** Creates or updates an 'Map' entity
     * 
     * @param {*} map
     * 
     * @return a Promisse object containing an array with the 'Map' object created or updated
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
            "version":"0.0.6",
        }

        api.systemSave(systemData).then((system) => { 
            console.log("system id = ", system);
            var procData = {
                "systemId": system[0].id,
                "name": "Transferência",
                "relativePath":"./",
                "deployDate": new Date(),    
            }
            
            api.processSave(procData).then(process => {
                console.log("process = ", process);

                var mapData = {
                    "processId": process[0].id,
                    "systemId" : system[0].id,
                    "name" : "map 1",
                    "content" : "content X"
                }

                api.mapSave(mapData).then(map => {
                    console.log("map = ", map);
                });
            });
        });
     *
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


        var mapData = {
            "id" : "3c09761a-dc71-493d-ace1-8b3dbd96e906",
            "content" : "content Z"
        }

        api.mapSave(mapData).then(op => console.log("operation = ", op));
     *
     */    
    mapSave(map) {
        return this.map.save(map);
    }

    /** Destroys a 'Map' entity
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Map' object destroyed
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

        api.mapDestroy("3c09761a-dc71-493d-ace1-8b3dbd96e906").then((map) => { 
            console.log('map = ', map);
        });
     */       
    mapDestroy(id) {
        return this.map.destroy(id);
    }

    /** Finds a 'Map' entity based on a 'System' id
     * 
     * @param {*} systemId 
     * 
     * @return a Promisse object containing an array with the 'Map' found
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

        api.mapFindBySystemId("95c14320-b750-4e59-8954-466dfac019a0").then((map) => { 
            console.log('map = ', map);
        });
     */       
    mapFindBySystemId(systemId) {
        return this.map.findBySystemId(systemId);
    }

    /** Finds a 'Map' entity based on its id
     * 
     * @param {*} id 
     * 
     * @return a Promisse object containing an array with the 'Map' found
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

        api.mapFindById("3c09761a-dc71-493d-ace1-8b3dbd96e906").then((map) => { 
            console.log('map = ', map);
        });
     */    
    mapFindById(id) {
        return this.map.findById(id);
    }

    /** Finds a 'Map' entity based on the 'Process' that it is related to
     * 
     * @param {*} processId 
     * 
     * @return a Promisse object containing an array with the 'Map' found
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

        api.mapFindByProcessId("e43fdaa7-92a3-4e36-8be5-709342827c5d").then((map) => { 
            console.log('map = ', map);
        });
     */        
    mapFindByProcessId(processId) {
        return this.map.findByProcessId(processId);
    }

    /** Finds a 'Map' entity based on its name
     * 
     * @param {*} processId 
     * 
     * @return a Promisse object containing an array with the 'Map' found
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

        api.mapFindByName("map 1").then((map) => { 
            console.log('map = ', map);
        });
     */      
    mapFindByName(name) {
        return this.map.findByName(name);
    }

    // ************************************************************************
    //                                INSTALLED APP
    // ************************************************************************

    /** Creates or updates an 'InstalledApp' entity
     * 
     * @param {*} installedApp
     * 
     * @return a Promisse object containing an array with the 'Event' object created or updated
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
            "version":"0.0.6",
        }

        api.systemSave(systemData).then((system) => { 
            console.log("system id = ", system);
            var instAppData = {
                "systemId": system[0].id,
                "host": "172.19.0.1",
                "port" : "90456",
                "name":"any name",
                "type" : "any type"
            }
            
            api.installedAppSave(instAppData).then(installedApp => {
                console.log("installedApp = ", installedApp);
            });
        });
     */
    installedAppSave(installedApp) {
        return this.installedApp.save(installedAppmap);
    }

    installedAppDestroy(id) {
        return this.installedApp.destroy(id);
    }

    mapFindBySystemId(systemId) {
        return this.installedApp.findBySystemId(systemId);
    }

    mapFindById(id) {
        return this.installedApp.findById(id);
    }

    mapFindBySystemIdAndType(systemId, type) {
        return this.installedApp.findByProcessId(processId);
    }

    mapFindByName(name) {
        return this.installedApp.findByName(name);
    }



}