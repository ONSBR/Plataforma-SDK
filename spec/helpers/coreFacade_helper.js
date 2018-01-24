module.exports = class CoreFacadeHelper {

    installedAppFindBySystemIdAndType() {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    "systemId": "ec498841-59e5-47fd-8075-136d79155705",
                    "host": "localhost",
                    "port": 9114,
                    "name": "domain",
                    "type": "domain",
                    "id": "32cf6b8d-9795-4987-8eac-ae9acc084feb",
                    "_metadata": {
                        "type": "installedApp",
                        "instance_id": "62141389-2ef2-4715-8675-a670ad7a00cc"
                    }
                }
            ])
        });
    }


    mapFindByProcessId(processId) {
        return new Promise((resolve, reject) => {
            let values = [
                {
                    "content" : "Conta:\r\n  model: conta\r\n  fields:\r\n    saldo:\r\n      column: saldo\r\n" +
                    "    titular:\r\n      column: titular\r\n  filters:\r\n    transferencia:\r\n      id:\r\n" + 
                    "        $in:\r\n          - \":origem\"\r\n          - \":destino\""
                }
            ];
            resolve(values);
        });
    };
}