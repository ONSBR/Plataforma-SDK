# Plataforma-SDK

#### Introdução
A Plataforma-SDK é o componente de software utilizado por aplicações para utilizar os recursos de plataforma disponíveis tais como reprodução, versionamento e reprocessamento


### Instalação do SDK Node

No seu arquivo package.json deve conter a dependência do SDK confrome exemplo abaixo:
```json
{
    ...
    "dependencies": {
        "plataforma-sdk": "git+https://github.com/ONSBR/Plataforma-SDK"
    }
}

```
Após adicionar a dependência você deve executar o comando:
```bash
$ npm install
```

### Utilização do SDK

Abaixo segue um exemplo de como importar o SDK da plataforma econfigurar o entrypoint da sua aplicação:
```javascript
const SDK = require("plataforma-sdk/worker/sdk")

SDK.run((context, resolve) => {
    var params = context.event.payload;
    console.log(params);
    resolve();
});
```

### Conteúdo
1. Criar aplicações de plataforma
    * [Criar uma Solution](Manuais/Solution.md)
    * [Criar uma Process App](Manuais/ProcessApp.md)
    * [Criar uma Domain App](Manuais/DomainApp.md)
    * [Criar uma Presentation App](Manuais/PresentationApp.md)
2. Metadados
    * [Mapas](Manuais/Mapas.md)
    * [Metadados](Manuais/Metadados.md)
3. [Recuperar evento de entrada](Manuais/Evento.md)
4. [Dataset](Manuais/Dataset.md)
6. Presentation Apps
    * [Dispatcher](Manuais/Dispatcher.md)
