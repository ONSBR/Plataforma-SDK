var Client = require('node-rest-client').Client;

class DataSetHelper {

    static save(operation, contexto) {
        //TODO precisa recuperar o contexto de volta da memoria de processamento
        if (operation.mustcommit && !contexto.evento.reproducao) {
            _saveDataSet(contexto.dataSet, processo);
        }
    }

    static _persistDataSet(dataSet, processo) {
        let entities = dataSet.entities;
    
        console.log("Insert entities: " + JSON.stringify(entities));
        var args = {
            data: JSON.stringify(entities),
            headers: {
                "Content-Type": "application/json",
                "Instance-Id": instprocess
            }
        };
        var reqExec = client.post(config.domainAppUrl + processo.nome + "/persist", args, function (data, response) {
            console.log("Entidade persistida na api de dominio com sucesso.");
        });
        reqExec.on('error', function (err) {
            console.log('Erro ao persistir entidade.', err);
        });
    }

}

module.exports = DataSetHelper;