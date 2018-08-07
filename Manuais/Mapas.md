### Definição de Mapas
Mapas são configurações de uma app que faz o mapeamento da sua coleção da Domain App para uma coleção que será disponível na sua aplicação. Com o mapa é possível desacoplar o dados de suas coleções de domínio da sua aplicação, além disso, é possível definir filtros de dados no seu mapa que serão disponibilizados dentro de sua aplicação e a execução desses filtros serão


### Criação de um Mapa

Os mapas devem ser criados dentro de suas Process Apps e Presentation Apps dentro da pasta mapa. Cada mapa é representado por um arquivo no formato yaml. O nome do arquivo será o nome do mapa usado para consultar dados do seu dominio.

### Exemplo de um mapa

Considerando o exemplo definido [aqui](DomainApp.md) iremos definir o seguinte mapa com o nome de Cotacao.yaml:
```yaml
CotacaoObj:
  model: cotacao
  fields:
    company:
      column: empresa
    value:
      column: valor
    type:
      column: tipo
    date:
      column: data
  filters:
    byCompany: "empresa = :company"
```

O exemplo acima, descreve um mapa para uma cotação definindo o nome da entidade mapeada CotacaoObj, cada campo da modelo de dominio foi mapeado para uma entidade mapeada. Um arquivo de mapa pode conter N mapeamentos.

Os mapas também definem filtros de dados, no exemplo acima, temos o filtro de nome "byCompany" que faz uma consulta de todos os registros da coleção "cotacao" com o campo empresa igual ao parametro :company.

O parâmetro :company será buscado dentro do payload do evento da sua app. Para o exemplo acima buscar o filtro byCompany o seu payload deverá conter o atributo company.
