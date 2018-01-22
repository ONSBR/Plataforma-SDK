const Utils = require("../utils");
const Model = require("../core/model");
describe('should test user models on platform',()=>{
    it('A model should have a _metadata field',()=>{
        var model = {};
        expect(() => new Model(model)).toThrow(new Error("Invalid Model"));

        model._metadata = {};
        expect(() => new Model(model)).toThrow(new Error("Invalid Type"));

        model._metadata = {};
        model._metadata.type = "a";
        expect(new Model(model).getType()).toEqual("a");

        model.name = "lorem";
        model.lastname = "ipsum";

        var m = new Model(model)
        model.fake = "a";
        expect(m.name).toBeDefined();
        expect(m.lastname).toBeDefined();
        expect(m.fake).not.toBeDefined();
    })
})