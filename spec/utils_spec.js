const Utils = require("../utils");
describe('should translate filter object to domain query url',()=>{
    it('should be return a query string in domain format',()=>{
        var filterObj = {
            filter: 'teste',
            origem: 'A',
            destino: 'B'
        };
        var queryString = Utils.toQueryString(filterObj);
        expect(queryString).toBe("?filter=teste&origem=A&destino=B")
    })
})