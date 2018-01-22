const ProcessApp = require("../worker/ProcessApp");
const Lookup = require("../ioc/lookup");
let filterComplex = {
    "transferencia": {
        "id": {
            "$in": [
                ":origem",
                ":destino"
            ]
        }
    }
};

let filterSimple = {
    "transferencia": {
        "id": ":id"
    }
}
let lookup = new Lookup();
let processApp = new ProcessApp(()=>{},
    lookup["info"],
    lookup["coreFacade"],
    lookup["domainClient"]);

describe('Should get all params from map filters', function () {
    it('should return params from map when filter is complex', function () {
        var params = processApp.getFilterParams(filterComplex);
        expect(params).toEqual(["origem","destino"]);
    });

    it('should return params from map when filter is simple', function () {

        var params = processApp.getFilterParams(filterSimple);
        expect(params).toEqual(["id"]);
    });
});


describe('Should get all filter to be executed based on event payload',()=>{
    it('should return a filter to be executed',()=>{
        var event = {};
        event.payload = {};
        event.payload.origem = "A";
        event.payload.destino = "B";
        var filter = {};
        filter.name = "transferencia";
        filter.content = filterComplex[filter.name];
        var filterEx = processApp.shouldBeExecuted(event,filter);
        expect(filterEx).toBeDefined();
        expect(filterEx.filter).toBe(filter.name);
        expect(filterEx.origem).toBe(event.payload.origem);
        expect(filterEx.destino).toBe(event.payload.destino);
    })

    it('should not return a filter when some filter arguments is missing',()=>{
        var event = {};
        event.payload = {};
        event.payload.origem = "A";
        var filter = {};
        filter.name = "transferencia";
        filter.content = filterComplex[filter.name];
        var filterEx = processApp.shouldBeExecuted(event,filter);
        expect(filterEx).not.toBeDefined();
    })
})


