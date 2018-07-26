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
const DependencyDomain = require("./dependencyDomain");
const Branch = require("./branch");
const DomainModel = require("./domainModel");


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
        this.branch = new Branch(configuration);
        this.domainModel = new DomainModel(configuration);
        this.dependencyDomain = new DependencyDomain(configuration);
    }


    reference(date){
        this.referenceDate = date;
        return this;
    }
    // ************************************************************************
    //                                SYSTEM
    // ************************************************************************

    systemSave(system){
        return this.system.save(system);
    }

    systemFindByName(name) {
        return this.system.reference(this.referenceDate).findByName(name);
    }

    systemFindById(id) {
        return this.system.reference(this.referenceDate).findById(id);
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
        return this.process.reference(this.referenceDate).findById(id);
    }

    processFindBySytemId(systemId) {
        return this.process.reference(this.referenceDate).findBySystemId(systemId);
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
        return this.processInstance.reference(this.referenceDate).findById(id);
    }

    processInstanceFindByProcessId(processId) {
        return this.processInstance.reference(this.referenceDate).findByProcessId(processId);
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
        return this.operation.reference(this.referenceDate).findById(id);
    }

    operationFindByProcessId(processId) {
        return this.operation.reference(this.referenceDate).findByProcessId(processId);
    }

    operationFindByProcessIdAndVersion(processId,version) {
        return this.operation.reference(this.referenceDate).findByProcessIdAndVersion(processId,version);
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
        return this.operationInstance.reference(this.referenceDate).findById(id);
    }

    operationInstanceFindByProcessInstanceId(processInstanceId) {
        return this.operationInstance.reference(this.referenceDate).findByProcessInstanceId(processInstanceId);
    }

    operationInstanceFindByOperationId(operationId) {
        return this.operationInstance.reference(this.referenceDate).findByOperationId(operationId);
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
        return this.event.reference(this.referenceDate).findById(id);
    }

    eventFindByProcessId(processId) {
        return this.event.reference(this.referenceDate).findByProcessId(processId);
    }

    eventFindByName(name) {
        return this.event.reference(this.referenceDate).findByName(name);
    }

    eventFindBySystemId(systemId) {
        return this.event.reference(this.referenceDate).findBySystemId(systemId);
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
        return this.map.reference(this.referenceDate).findBySystemId(systemId);
    }

    mapFindById(id) {
        return this.map.reference(this.referenceDate).findById(id);
    }

    mapFindByProcessId(processId) {
        return this.map.reference(this.referenceDate).findByProcessId(processId);
    }

    mapFindByProcessIdAndVersion(processId,version) {
        return this.map.reference(this.referenceDate).findByProcessIdAndVersion(processId,version);
    }

    mapFindByName(name) {
        return this.map.reference(this.referenceDate).findByName(name);
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
        return this.installedApp.reference(this.referenceDate).findBySystemId(systemId);
    }

    installedAppFindById(id) {
        return this.installedApp.reference(this.referenceDate).findById(id);
    }

    installedAppFindBySystemIdAndType(systemId, type) {
        return this.installedApp.reference(this.referenceDate).findBySystemIdAndType(systemId,type);
    }

    installedAppFindByName(name) {
        return this.installedApp.reference(this.referenceDate).findByName(name);
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
        return this.presentation.reference(this.referenceDate).findBySystemId(systemId);
    }

    presentationFindById(id) {
        return this.presentation.reference(this.referenceDate).findById(id);
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
        return this.presentationInstance.reference(this.referenceDate).findByPresentationId(presentationId);
    }

    presentationInstanceFindById(id) {
        return this.presentationInstance.reference(this.referenceDate).findById(id);
    }


    // ************************************************************************
    //                                DEPENDENCY DOMAIN
    // ************************************************************************
    dependencyDomainSave(presInst) {
        return this.dependencyDomain.save(presInst);
    }

    dependencyDomainDestroy(id) {
        return this.dependencyDomain.destroy(id);
    }

    dependencyDomainFindById(id) {
        return this.dependencyDomain.reference(this.referenceDate).findByPresentationId(id);
    }

    dependencyDomainFindBySystemId(id) {
        return this.dependencyDomain.reference(this.referenceDate).findBySystemId(id);
    }

    dependencyDomainFindByProcessId(id) {
        return this.dependencyDomain.reference(this.referenceDate).findByProcessId(id);
    }

}