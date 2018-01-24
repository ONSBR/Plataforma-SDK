const ProcessApp = require("../worker/ProcessApp");
const Lookup = require("../ioc/lookup");
const CoreFacadeHelper = require("./helpers/coreFacade_helper");
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
let processApp = new ProcessApp(() => { },
    lookup["info"],
    lookup["coreFacade"],
    lookup["domainClient"]);

describe('Should get all params from map filters', function () {
    it('should return params from map when filter is complex', function () {
        var params = processApp.getFilterParams(filterComplex);
        expect(params).toEqual(["origem", "destino"]);
    });

    it('should return params from map when filter is simple', function () {

        var params = processApp.getFilterParams(filterSimple);
        expect(params).toEqual(["id"]);
    });
});


describe('Should get all filter to be executed based on event payload', () => {
    it('should return a filter to be executed', () => {
        var event = {};
        event.payload = {};
        event.payload.origem = "A";
        event.payload.destino = "B";
        var filter = {};
        filter._map = "m";
        filter._entity = "a";
        filter.name = "transferencia";
        filter.content = filterComplex[filter.name];
        var filterEx = processApp.shouldBeExecuted(event, filter);
        expect(filterEx).toBeDefined();
        expect(filterEx._map).toBeDefined();
        expect(filterEx._entity).toBeDefined();
        expect(filterEx.filter).toBe(filter.name);
        expect(filterEx.origem).toBe(event.payload.origem);
        expect(filterEx.destino).toBe(event.payload.destino);
    })

    it('should not return a filter when some filter arguments is missing', () => {
        var event = {};
        event.payload = {};
        event.payload.origem = "A";
        var filter = {};
        filter.name = "transferencia";
        filter.content = filterComplex[filter.name];
        var filterEx = processApp.shouldBeExecuted(event, filter);
        expect(filterEx).not.toBeDefined();
    })
})

describe('Should get object relational mapping based on process id', () => {
    let processAppWithMocks = new ProcessApp(() => { },
        lookup["info"],
        new CoreFacadeHelper(),
        lookup["domainClient"]);

    it('Should get object relational mapping based on process id', function (done) {
        let promiseMapByProcessId = processAppWithMocks.getMapByProcessId(lookup["info"].processId);
        expect(promiseMapByProcessId).toBeDefined();
        promiseMapByProcessId.then(function (platformMap) {
            expect(platformMap).toBeDefined();
            expect(platformMap.content.Conta).toBeDefined();
            expect(platformMap.content.Conta.model).toBeDefined();
            done();
        });
    })
})

describe('Should Get list of filters and entities based on map', () => {

    it('Should Get list of filters and entities based on map', function (done) {
        let platformMap = {
            name: 'Conta',
            content: {
                Conta: {
                    model: 'tb_conta',
                    fields: [{ saldo: { column: 'saldo' }, titular: { column: 'titular' } }],
                    filters: [{ byName: { id: ':id' } }]
                }
            }
        };

        let filtersOnMapPromise = processApp.getFiltersOnMap(platformMap);
        expect(filtersOnMapPromise).toBeDefined();
        filtersOnMapPromise.then(function (filtersByMap) {
            expect(filtersByMap).toBeDefined();
            expect(filtersByMap[0]).toBeDefined();
            expect(filtersByMap[0]._map).toBe('Conta');
            expect(filtersByMap[0]._entity).toBe('Conta');
            expect(filtersByMap[0].content.byName).toBeDefined();
            expect(filtersByMap[0].content.byName.id).toBe(':id');
            done();
        });
    }, 10000)
})
