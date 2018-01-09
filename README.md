# Plataforma-SDK

#### Introdução
A Plataforma-SDK mantém ferramentas utilitárias para interação entre os projetos ou recursos de execução de processos, como o worker.


#### Estrutura do Projeto

O projeto é dividido em 3 partes:
* [_scripts]: contém os scripts de inicialização dos servidores do projeto, sem uso do docker
* [geraJs]: contém os javascripts para gerar classes de modelo a partir dos yamls de entidades 
* [services]: contém os serviços de acesso a dados das entidades do core da plataforma
* [worker]: contém o ´run.js´ para execução dos ProcessApp solicitados pelo executor

Na pasta de ´_scripts´ são mantidos os shells de execução de todos os servidores da plataforma.
    - config-localdependencies.sh: configura para as dependências entre os projetos serem obtidos por link, ou seja, obtido de forma local,                                 ao invés de pelo repositório git.
    - start-EventManager: inicializa apenas o servidor de gerenciamento de eventos.
    - start-Executor.sh: inicializa apenas o executor de processos da plataforma.
    - start-PresentationApp.sh: inicializa apenas o server da camada de apresentação.
    - start-ProcessMemory.sh: inicializa apenas o servidor de controle de memória de processamento.
    - start-Router: inicializa apenas o servidor de roteamento de urls.
    - start-servers: inicializa todos os servidores da plataforma.
    - stop-servers: finaliza todos os servidores da plataforma.

Na pasta de ´geraJs´ ficam os scripts para gerar classes javascript a partir dos yamls de mapa.

Na pasta de ´services´ ficam as classes utilitárias de consulta de dados do core (CoreRepository, CoreStorage).

OBS: Nessa pasta ´_init´ também se encontra um script (_initcoreStorage) para carga de dados de inicialização e testes da plataforma.
     Estes dados são carregados numa pasta temporária JSON.

Na pasta de ´worker´ se encontra o executor dos processos (run.js) de negócio. O executor chama esse script para fazer as execuções dos processapp, após a estrturação da instância do processo realizada pelo Executor.

Neste projeto também são apresentadas classes de utilitários ´utils.js´. E também o EventHelper que fornece métodos para envio de eventos para o gerenciador de eventos.


#### Requisitos

Para executar as aplicações com sucesso você precisa instalar as seguintes ferramentas:
* [NodeJS](https://nodejs.org)
* NPM (vem junto com o NodeJS)
* [Docker](https://www.docker.com/)
* Docker compose

Caso você opte por usar o docker você pode subir com o seguinte comando:
```sh
$ docker-compose up -d
```
Ao executar esse comando o docker irá subir um container com servidor da apresentação.

### Para instalar ou atualizar as dependências é necessário executar o comando:
npm install
