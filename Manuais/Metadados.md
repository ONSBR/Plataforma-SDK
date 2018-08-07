### O que são Metadados?

Os metadados as aplicações é um conjuntos de definições de binding de eventos e outras configurações usadas pela plataforma na hora de executar ou reprocessar sua aplicação.

Os metadados são baseados num arquivo no formato yaml, abaixo segue um exemplo de metadados.

```yaml
operations:
  - name: retificacao-cotacao
    event: retificacao.cotacao.request
    commit: true
    skip_reprocessing: true
```

O arquivo de metadados definem uma lista de configuração de operações,as configurações são:

1. name: é o nome da operação definida
2. event: é o nome do evento que sua aplicação irá escutar
3. commit: é uma configuração para indicar se sua aplicação irá commitar as informações no domínio
4. skip_reprocessing: é uma flag que indica que sua aplicação não será considerada no processo de reprocessamento