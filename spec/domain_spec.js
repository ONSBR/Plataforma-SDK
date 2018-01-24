const Lookup = require("../ioc/lookup");
const DomainClient = require("../services/domain/client");
const CoreFacadeHelper = require("./helpers/coreFacade_helper");
const HttpClientHelper = require("./helpers/httpClient_helper");
let lookup = new Lookup();
let httpClient = new HttpClientHelper();
describe("Should test DomainClient component",()=>{
    it("should load domain data", (done)=>{
        httpClient.when("get","http://localhost:9114/map/person",()=>{
            return [
                {
                    "saldo": 20,
                    "titular": "joao",
                    "id": "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae",
                    "_metadata": {
                        "type": "Conta"
                    }
                },
                {
                    "saldo": 1,
                    "titular": "moneda",
                    "id": "c5c2ee65-a796-41a3-8d17-2004d4fb8d85",
                    "_metadata": {
                        "type": "Conta"
                    }
                }
            ];
        })
        var client = new DomainClient(lookup["info"],new CoreFacadeHelper(),httpClient)
        client.query({
            _map:"map",
            _entity:"person"
        }).then((e)=>{
            expect(e.length).toEqual(2);
        }).catch(e =>{
            expect(e).not.toBeDefined();
        });
        done();
    })


    it("should load many domain data", (done)=>{
        httpClient.when("get","http://localhost:9114/map/person",()=>{
            return [
                {
                    "saldo": 20,
                    "titular": "joao",
                    "id": "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae",
                    "_metadata": {
                        "type": "Conta"
                    }
                },
                {
                    "saldo": 1,
                    "titular": "moneda",
                    "id": "c5c2ee65-a796-41a3-8d17-2004d4fb8d85",
                    "_metadata": {
                        "type": "Conta"
                    }
                }
            ];
        })
        var client = new DomainClient(lookup["info"],new CoreFacadeHelper(),httpClient)
        client.queryMany([{
            _map:"map",
            _entity:"person"
        },{
            _map:"map",
            _entity:"person"
        }]).then((array)=>{
            expect(array.length).toEqual(2);
            for(let i=0; i<array.length; i++){
                expect(Array.isArray(array[i])).toBe(true);
            }
        }).catch(e =>{
            console.error("Error:", e);
            expect(e).toBeUndefined();
        })
        done();
    })
});


