const ApiCoreFacade = require("../api-core/apiCoreFacade")

var Configuration = {
    scheme: "http", 
    host: "localhost", 
    port: "9100"
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




