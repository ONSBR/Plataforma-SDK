const Utils = require("../utils");
const DataSetBuilder = require("../dataset/builder");
const DataSet = require("../dataset/dataset");
const data = [
    [
        {
            "saldo": 20,
            "titular": "lorem",
            "id": "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae",
            "_metadata": {
                "type": "Conta"
            }
        },
        {
            "saldo": 1,
            "titular": "ipsum",
            "id": "c5c2ee65-a796-41a3-8d17-2004d4fb8d85",
            "_metadata": {
                "type": "Conta"
            }
        },
        {
            "nome": "teste",
            "sobrenome": "sobreteste",
            "id": "d5c2ee65-a796-41a3-8d17-2004d4fb8d85",
            "_metadata": {
                "type": "Pessoa"
            }
        },
        {
            "nome": "teste 2",
            "sobrenome": "sobreteste 2",
            "id": "d5c2ee65-a796-41a3-9d17-2004d4fb8d85",
            "_metadata": {
                "type": "Pessoa"
            }
        }
    ]
];

describe('should build a new dataset using datasetbuilder', () => {
    it('should create a new dataset', () => {
        expect(() => new DataSetBuilder()).toThrow(new Error("Domain data should be defined"))
    })

    it('should index data from domain', () => {
        var index = new DataSetBuilder(data).index();
        expect(index["Conta"]).toBeDefined();
        expect(index["Pessoa"]).toBeDefined();
        expect(index["Conta"].length).toEqual(2);
        expect(index["Pessoa"].length).toEqual(2);
    })

    it('should set changeTrack to update when insert with id', () => {
        var dataset = new DataSetBuilder(data).build();
        var conta = {
            "saldo": 20,
            "id":"2",
            "titular": "lorem"
        }
        dataset.Conta.insert(conta);
        expect(dataset.Conta.collection.toArray().length).toEqual(3);
        var saved = dataset.Conta.collection.toArray().filter(f => f.id === "2")[0];
        expect(saved).toBeDefined();
        expect(saved._metadata.changeTrack).toEqual("update");
    })

    it('should create new item in dataset', () => {
        var dataset = new DataSetBuilder(data).build();
        var conta = {
            "saldo": 20,
            "titular": "lorem"
        }
        dataset.Conta.insert(conta);
        expect(dataset.Conta.collection.toArray().length).toEqual(3);
        var saved = dataset.Conta.collection.toArray().filter(f => !f.id)[0];
        expect(saved).toBeDefined();
        expect(saved._metadata.changeTrack).toEqual("create");
    })

    it('should create type methods in dataset', () => {
        var dataset = new DataSetBuilder(data).build();
        expect(dataset.Conta).toBeDefined();
        expect(dataset.Pessoa).toBeDefined();
    })

    it('should update item in dataset', () => {
        var dataset = new DataSetBuilder(Utils.clone(data)).build();
        var original = dataset.Conta.collection
        .where(c => c.id === "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae")
        .toArray()[0];
        expect(original.saldo).not.toEqual(200);
        original.saldo = 200;
        dataset.Conta.update(original);

        original = dataset.Conta.collection
        .where(c => c.id === "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae")
        .toArray()[0];

        expect(original).toBeDefined();
        expect(original.saldo).toEqual(200);
        expect(original._metadata.changeTrack).toEqual("update");
    })


    it('should destroy item in dataset', () => {
        var dataset = new DataSetBuilder(Utils.clone(data)).build();
        var original = dataset.Conta.collection
        .where(c => c.id === "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae")
        .toArray()[0];
        expect(original).toBeDefined();
        dataset.Conta.delete(original);

        original = dataset.Conta.collection
        .where(c => c.id === "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae")
        .toArray()[0];
        expect(original).not.toBeDefined();
        var o = dataset.entities["Conta"].filter(c => c.id === "ba3ad65c-7bf4-45a7-8f87-d46fe8b6c9ae")[0]
        expect(o._metadata.changeTrack).toEqual("destroy");
    })
})