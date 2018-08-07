### Dispatcher
Como trazer as funcionalidades de reprodução, reprocessamento para Presentation Apps?
A resposta é dada pelo componente Dispatcher do SDK. Com ele é possível incorporar esses comportamentos dentro da sua aplicação web.

Segue um exemplo de uso do dispatcher.

```javascript
const dispatcher = require("./dispatcher/dispatcher");
const SDK = require("plataforma-sdk/worker/sdk");
const api = require("./api");

SDK.bind(dispatcher).serve(api);
```

Através do SDK você irá importar o dispatcher e configurar através do SDK a sua aplicação para utilizar o dispatcher e também servir sua API.

Pelo exemplo acima, segue o módulo de API que foi utilizado.

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const config = require('./config');
var path     = require('path');
const ManterTarefasController = require('./controllers/mantertarefascontroller');

const app = express();
const PORT = config.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/inserirtarefa", (req, res) => {
    manterTarefasController.inserirTarefa(req, res);
});

module.exports = function(){
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
};
```

No exemplo acima, a API foi feita utilizando Express e ao final o app do Express é encapsulado por uma função que será controlada pelo SDK.

Segue o exemplo de implementação de um dispatcher.

```javascript
const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();
const manterTarefasMediator = new (require('../business/mantertarefasmediator'))();

dispatcher.register("presentation.uploadplanilha.tarefa.request", (context, resolve, reject)=>{
    manterTarefasMediator.uploadPlanilha(context, resolve, reject);
});
dispatcher.register("presentation.insere.tarefa.request", manterTarefasMediator.inserirTarefa);
dispatcher.register("presentation.exclui.tarefa.request", manterTarefasMediator.excluirTarefa);
dispatcher.register("presentation.aplica.tarefa.request", (context, resolve, reject, eventManager)=>{
    return manterTarefasMediator.aplicarTarefa(context, resolve, reject);
});
dispatcher.register("presentation.executaretificacao.tarefa.request", (context, resolve, reject, eventManager)=>{
    manterTarefasMediator.executarRetificacao(context, resolve, reject, eventManager);
});

module.exports = dispatcher;
```

O dispatcher traz para sua aplicação web o mesmo comportamento de uma Process App.

Segue um exemplo de como disparar os eventos internos da sua aplicação web que serão capturados pelos métodos transacionais de sua aplicação.

```javascript
const dispatcher = require("../dispatcher/dispatcher");

class ManterTarefasController {

    constructor(domainPromiseHelper) {
    }

    inserirTarefa(request, response) {
        let nomeTarefa = request.body.nomeTarefa;
        dispatcher.dispatch("presentation.insere.tarefa.request", { nomeTarefa: nomeTarefa }).then(data => {
            response.send(data);
        }).catch(e => {
            this.responseError('Erro durante a inserção da tarefa', e, response);
        });
    }
}

module.exports = ManterTarefasController
```