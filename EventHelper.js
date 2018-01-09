var Client = require('node-rest-client').Client;
var config = require('./config');

function sendEvent(evento) {

    var client = new Client();
    
    var args = { data: evento, headers: { "Content-Type": "application/json" } };

    var reqExec = client.post(config.eventManagerUrl, args, function (data, response) {
        console.log("Evento " + evento.name + " enviado para o event-manager!");
    });
    reqExec.on('error', function (err) {
        console.log('request error', err);
    });

}

module.exports.sendEvent = sendEvent;