const BaseEntity = require("./baseEntity");

module.exports = class PresentationInstance extends BaseEntity {
    constructor(configuration){
        super(configuration,"presentationInstance");
    }



    findBySystemIdType(presentationId) {
        var criteria = {
            filterName : "byPresentationId",
            parameters :
            [
                {
                    fieldName : "presentationId",
                    fieldValue : presentationId
                }
            ]
        }
       var url = this.assembleFindUrl(criteria);
       return this.httpClient.get(url);
    }

}