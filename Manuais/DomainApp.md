### O que é Domain App?

Uma Domain App é uma aplicação baseada em configuração que você irá modelar suas coleções de dados.

### Como construir uma Domain App?

Uma Domain App pode ser construída através do CLI(Command Line Interface) da plataforma através do seguinte comando:
```sh
$ plataforma --new domain
```

### Definição das coleções

Dentro da sua nova Domain App existe uma pasta denominadas Dominio e dentro dela você poderá declarar todas as suas coleção de dados.

Segue abaixo um exemplo de um design de coleção de dados Cotacao.yaml:
```yaml
cotacao:
  empresa:
    - string
  tipo:
    - string
  valor:
    - integer
  data:
    - datetime
```

A primeira linha você define o nome da sua coleção;
Em seguida você define o nome dos campos de sua coleção e o tipo de dados.

### Tipos de dados disponíveis

1. string
2. integer
3. char
4. text
5. bigint
6. float
7. real
8. decimal
9. boolean
10. time
11. datetime
12. hstore
13. json
14. jsonb
15. blob
16. uuid
17. timestamp