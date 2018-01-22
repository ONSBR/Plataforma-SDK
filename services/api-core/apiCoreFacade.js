//import { open } from "inspector";


const System = require("./system");
const Process = require("./process");
const Operation = require("./operation");
const ProcessInstance = require("./processInstance");
const OperationInstance = require("./operationInstance");
const Event = require("./event");
const Map = require("./map");
const InstalledApp = require("./installedApp");
const Presentation = require("./presentation");
const PresentationInstance = require("./presentationInstance");

// ###########################################################################
// *************** General documentation ***************
// ###########################################################################

/** abcSave(abcData) - Creates or updates a 'abc' instance
 * 
 * @param {*} abcData contains an 'abc' data 
 * 
 * @return a Promisse object containing an array with 'abc' object created or updated
 * 
 * @example for Create
    const ApiCoreFacade = require("../api-core/apiCoreFacade")

    var Configuration = {
        scheme: "http", 
        host: "localhost", 
        port: "9110"
    }

    var api = new ApiCoreFacade(Configuration);

    var abcData = {
        "field1": "value1",
        "field2": "value2",
        "field3": "value3"
    }

    api.abcSave(abcData).then((abc) => { 
        console.log(abc);
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

    var abcmData = {
        "id" : "945a0af3-f4df-4ff1-a671-4420bc20b3c7",
        "field2": "new value2"
    }

    api.abcSave(abcData).then((abc) => { 
        console.log('abc = ', abc);
    });
*/

/** abcFindByName(name)   
 * 
 * Finds a 'abc' instance based on its name
 * 
 * @param {*} name 
 * 
 * @return a Promisse object containing an array with the 'abc' objects found 
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

    api.abcFindByName("a name").then((abc) => { 
        console.log('abc = ', abc);
    });
*/

/** abcFindById(id)
 * 
 * Finds a 'abc' instance based on its id
 * 
 * @param {*} id 
 * 
 * @return a Promisse object containing an array with the 'abc' found
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

    api.abcFindById("92dee4ea-833e-4feb-b5e7-20b5d2132a97").then((abc) => { 
        console.log('abc = ', abc);
    });
*/

/** abcDestroy(abc) 
 * 
 * Destroys a 'abc' instance
 * 
 * @param {*} abc is a JSON containing the id of the instance to be destroyed 
 * 
 * @return a Promisse object containing an array with the 'System' object destroyed
 * 
 * @attention Destroy means to set the end of validity
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

    var abcData = {
        "id" : "945a0af3-f4df-4ff1-a671-4420bc20b3c7",
    }

    api.abcDestroy(abcData).then((abc) => { 
        console.log(abc);
    });
*/

/** abcFindBySytemId(systemId)
 * 
 * Finds a 'abc' instance based on a 'System' id
 * 
 * @param {*} systemId 
 * 
 * @return a Promisse object containing an array with the 'abc' found
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

    api.abcFindBySytemId("961e8deb-9400-472b-b354-f58910f5c5c6").then((abc) => { 
        console.log('abc = ', abc);
    });
*/    

/** abcFindByProcessId(processId) 
 * 
 * Finds a 'abc' instance based on the 'Process' that it is related to
 * 
 * @param {*} processid
 * 
 * @return a Promisse object containing an array with the 'abc' found
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

    api.abcFindByProcessId("f83c952a-5308-458a-a8db-61129d990464").then((abc) => { 
        console.log('abc = ', abc);
    });
*/

/**  abcFindByProcessInstanceId(processInstanceId)
 * 
 * Finds a 'abc' entity based on the process instance it is related to
 * 
 * @param {*} processInstanceId 
 * 
 * @return a Promisse object containing an array with the 'abc' found
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

    api.abcFindByProcessInstanceId("f3beea6a-5a52-4f62-bcb4-bd03151f59fb").then((abc) => { 
        console.log('abc = ', abc);
    });
*/ 

/** abcFindByPresentationId(presentationId)
 * 
 * Finds a 'abc' entity based on the presentation instance it is related to
 * 
 * @param {*} processInstanceId 
 * 
 * @return a Promisse object containing an array with the 'abc' found
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

    api.abcFindByPresentationId("f3beea6a-5a52-4f62-bcb4-bd03151f59fb").then((abc) => { 
        console.log('abc = ', abc);
    });
*/

/** abcInstanceFindByOperationId(operationId)
 * 
 * Finds a 'abc' instance based on the operation it is related to
 * 
 * @param {*} operationId 
 * 
 * @return a Promisse object containing an array with the 'abc' found
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

    api.abcFindByOperationId("94ef1d10-cc77-4ac8-afbf-589dc63380ee").then((abc) => { 
        console.log('abc = ', abc);
    });
*/       

/** abcFindBySystemIdAndType(systemId, type) 
 * 
 * Finds a 'abc' instance based on a system id and a type
 * 
 * @param {*} operationId 
 * 
 * @return a Promisse object containing an array with the 'abc' found
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

    api.abcFindBySystemIdAndType("94ef1d10-cc77-4ac8-afbf-589dc63380ee", "type 1").then((abc) => { 
        console.log('abc = ', abc);
    });
*/ 

 /** Initializes the module
 * 
 */
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
        this.presentation = new Presentation(configuration);
        this.presentationInstance = new PresentationInstance(configuration);
    }

    // ************************************************************************
    //                                SYSTEM
    // ************************************************************************

    systemSave(system){
        return this.system.save(system);
    }

    systemFindByName(name) {
        return this.system.findByName(name);
    }

    systemFindById(id) {
        return this.system.findById(id);
    }

    systemDestroy(system) {
        return this.system.destroy(system);
    }

    // ************************************************************************
    //                                PROCESS
    // ************************************************************************

    processSave(process) {
        return this.process.save(process);
    }

    processFindById(id) {
        return this.process.findById(id);
    }

    processFindBySytemId(systemId) {
        return this.process.findBySystemId(systemId);
    }

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
        return this.operationInstance.findByOperationId(operationId);
    }


    // ************************************************************************
    //                                EVENT
    // ************************************************************************
   
    eventSave(ev) {
        return this.event.save(ev);
    }
  
    eventDestroy(id) {
        return this.event.destroy(id);
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

    eventFindBySystemId(systemId) {
        return this.event.findBySystemId(systemId);
    }

    // ************************************************************************
    //                                MAP
    // ************************************************************************

    mapSave(map) {
        return this.map.save(map);
    }

    mapDestroy(id) {
        return this.map.destroy(id);
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

    // ************************************************************************
    //                                INSTALLED APP
    // ************************************************************************

    installedAppSave(installedApp) {
        return this.installedApp.save(installedAppmap);
    }

    installedAppDestroy(id) {
        return this.installedApp.destroy(id);
    }

    installedAppFindBySystemId(systemId) {
        return this.installedApp.findBySystemId(systemId);
    }

    installedAppFindById(id) {
        return this.installedApp.findById(id);
    }

    installedAppFindBySystemIdAndType(systemId, type) {
        return this.installedApp.findBySystemIdAndType(processId);
    }

    installedAppFindByName(name) {
        return this.installedApp.findByName(name);
    }

    // ************************************************************************
    //                                PRESENTATION
    // ************************************************************************    

    presentationSave(pres) {
        return this.presentation.save(pres);
    }

    presentationDestroy(id) {
        return this.presentation.destroy(id);
    }

    presentationFindBySystemId(systemId) {
        return this.presentation.findBySystemId(systemId);
    }

    presentationFindById(id) {
        return this.presentation.findById(id);
    }

    // ************************************************************************
    //                                PRESENTATION INSTANCE
    // ************************************************************************    
    presentationInstanceSave(presInst) {
        return this.presentationInstance.save(presInst);
    }

    presentationInstanceDestroy(id) {
        return this.presentationInstance.destroy(id);
    }

    presentationInstanceFindByPresentationId(presentationId) {
        return this.presentationInstance.findByPresentationId(presentationId);
    }

    presentationInstanceFindById(id) {
        return this.presentationInstance.findById(id);
    }    
}