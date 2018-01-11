import { open } from "inspector";


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
        this.operation = new Operation(configuration);
        this.processInstance = new ProcessInstance(configuration);
        this.operationInstance = new OperationInstance(configuration);
        this.event = new Event(configuration);
        this.map = new Map(configuration);
    }

    saveSystem(system){
        return this.system.save(system);
    }

    saveProcess(process) {
        return this.process.save(process);
    }

    saveOperation(operation) {
        return this.operation.save(operation);
    }

    saveProcessInstance(processInstance) {
        return this.processInstance.save(processInstance);
    }

    saveOperationInstance(operationInstance) {
        return this.operationInstance.save(operationInstance);
    }

    saveEvent(event) {
        return this.event.save(event);
    }

    saveMap(event) {
        return this.map.save(event);
    }
}