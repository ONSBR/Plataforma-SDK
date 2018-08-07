### Evento

Um eventos é uma mensagem que a plataforma irá passar como input para o seu processo, esse evento é passado dentro de um contexto de execução da sua aplicação. Abaixo segue um exemplo de uma Process App

```javascript
const SDK = require("plataforma-sdk/worker/sdk")

SDK.run((context, resolve) => {
    var payload = context.event.payload;
    console.log(payload);
    resolve();
});
```

O código acima mostra como recuperar os parametros de entrada através do evento.