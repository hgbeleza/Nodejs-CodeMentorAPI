# NODEJS & SEQUELIZE

Readme para anotações breves sobre meu estudo em desenvolvimento de APIs com Node.js, com foco na utilização da ferramenta Sequelize ORM para interagir com bancos de dados relacionais.

## Conhecendo o SequelizeORM

O Sequelize é um ORM (Object-Relational Mapping) para Node.js, que significa Mapeamento Objeto-Relacional. Ele permite que os desenvolvedores usem objetos JavaScript para interagir com um banco de dados relacional, como MySQL, PostgreSQL, SQLite e outros.

O Sequelize simplifica o processo de consulta, inserção, atualização e exclusão de dados em um banco de dados relacional, fornecendo uma interface baseada em promessas para interagir com o banco de dados. Em vez de escrever consultas SQL diretamente, os desenvolvedores podem usar métodos fornecidos pelo Sequelize para realizar operações no banco de dados de uma maneira mais intuitiva e orientada a objetos.

- Documentação do sequelize: <a href="https://sequelize.org/" target="_blank">sequelize.org</a>

## Instalando e configurando

No diretório raiz do projeto, execute o comando: <br/> `npm install sequelize@6.32.1 sequelize-cli@6.6.1 sqlite3@5.1.6 --save-exact`

O Sequelize CLI é uma ferramenta útil para auxiliar no desenvolvimento de aplicações Node.js que utilizam o Sequelize ORM.

Antes de executar qualquer comando do sequelize-cli, crie no diretório raiz do projeto um arquivo chamado `.sequelizerc` (.sequelizerc é um arquivo de configuração que defini caminhos para diferentes partes do projeto). Dentro dele, o seguinte código:

```javascript
const path = require("path");

module.exports = {
  config: path.resolve("./src/config", "config.json"),
  "models-path": path.resolve("./src/models"),
  "seeders-path": path.resolve("./src/seeders"),
  "migrations-path": path.resolve("./src/migrations"),
};
```

Execute o comando pra iniciar o sequelize: `npx sequelize-cli init`. Dentro da pasta src, foi criado quatro pastas: `config`, `models`, `seeders` e `migrations`. Dentro da pasta config tem um arquivo `config.json` que serve para fazer a conexão com o banco de dados.

- <a target="_blank" href="https://www.alura.com.br/artigos/dotenv-gerenciando-variaveis-ambiente?_gl=1*z5oqd*_ga*MTMyNjk1NDcyNi4xNzA4NzA2MjY3*_ga_1EPWSW3PCS*MTcxMDk0NTExNC45LjEuMTcxMDk0OTY0OS4wLjAuMA..*_fplc*emxCU1llNEQxUzdUQ1ZSNUtTaUxFSkhXQjdObEYzVm1SeTZDY01xQ2FVWFdTcU82Q3dmN09QR3Y0NmRzJTJGVTElMkZrZzRoc2psOVpENlBnRXZ6SXlnN2NISVZYY2xON1p1JTJCWXFUdUVNQ2duT2dDT242N0tVVG5acHhiaUFCZjVRJTNEJTNE">Como utilizar variáveis de ambiente em JavaScript</a>
- <a href="https://sequelize.org/docs/v6/getting-started/#installing">Lista de banco de dados compatíveis com sequelize</a>
- <a href="https://alura.com.br/artigos/sql-injection-proteja-sua-aplicacao?_gl=1*1dzkyvn*_ga*MTMyNjk1NDcyNi4xNzA4NzA2MjY3*_ga_1EPWSW3PCS*MTcxMDk0NTExNC45LjEuMTcxMDk1MDI3NS4wLjAuMA..*_fplc*emxCU1llNEQxUzdUQ1ZSNUtTaUxFSkhXQjdObEYzVm1SeTZDY01xQ2FVWFdTcU82Q3dmN09QR3Y0NmRzJTJGVTElMkZrZzRoc2psOVpENlBnRXZ6SXlnN2NISVZYY2xON1p1JTJCWXFUdUVNQ2duT2dDT242N0tVVG5acHhiaUFCZjVRJTNEJTNE">SQL injection</a>: entenda uma das falhas de segurança mais comuns e que é tratado internamente por ORMs como Sequelize;

## Criando model com sequelize-cli

Para criar models com sequelize-cli, usamos o comando: <br/>
`npx sequelize-cli model:generate --name TableName --attributes arg1:string,arg2:string,arg3:string`.

A _flag_ `--name` será o nome do modelo que vamos gerar. A outra _flag_ `--attributes`, serve para listar as propriedades que o modelo terá.

## Nomeclaturas

Outro aspecto importante sobre o SQL, um daqueles conhecimentos que todos precisam ter mesmo usando o ORM, é a questão das nomenclaturas.

Existem alguns padrões para nomear tabelas e colunas em SQL. Um dos mais básicos é nomear as tabelas todas em minúsculo e no plural. Por exemplo: uma tabela de pessoas nomeada como "pessoas", da mesma forma como teríamos a tabela "carros" e a tabela "animais".

Além disso, um padrão muito comum no SQL é o uso do underline (\_) para separar termos. Os nomes em JavaScript são normalmente separados com camel case, o que pode gerar um problema na hora do Sequelize identificar os nomes das tabelas e relacionar o nome da tabela com o nome do modelo.

Para esse comportamento ser evitado, dentro do modelo que foi criado, no método `Modelo.init()`, há um parâmetro que é um objeto com `modelName`. Vamos incluir outra propriedade chamada `tableName`. Para ela vamos usar o nome da tabela em minúscula e em plural.

```javascript
Modelo.init(
  {
    // propriedades
  },
  {
    sequelize,
    modelName: "Modelo",
    tableName: "modelos",
  }
);
```

Isso é importante, porque é muito comum trabalharmos com nomes específicos das tabelas do banco de dados, e precisamos entender onde o Sequelize chama os nomes dos modelos e onde ele se refere às tabelas relacionadas a esses modelos, o que é muitas vezes fonte de bug no Sequelize.

Portanto, para todo modelo que criar, associe um nome de tabela e deixe o nome dessa tabela explícito. Além disso, o Sequelize, automaticamente, tenta pluralizar as palavras, colocando um "S" no final, mas sabe fazer isso somente em inglês, não em português.

- <a href="https://sequelize.org/docs/v6/core-concepts/model-basics/#model-definition">Documentação sobre criação de modelos</a>

## Migrando para o banco de dados

Junto ao modelo, também foi criado um arquivo na pasta "migrations" com uma nomeclatura que, no inicío tem uma sequência numérica e depois o nome do modelo. EX: `20230905181600-create-modelo.js`. A sequência numérica ao início do nome representa a data e hora atuais.

Esse arquivo é basicamente um objeto contendo dois métodos importados diretamente pelo módulo. Os métodos são: `async up()` e `async down()`.

```javascript
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Modelos', {
      // Propriedades
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Modelos');
  }
};
```

E, em primeiro lugar, no escopo, é chamado o método `createTable()`. O primeiro parâmetro do método `createTable()` é uma string em que o Sequelize adicionou automaticamente `Modelos` com "M" maiúsculo e "s" no final. Altere o nome da string para o padrão de nomeclatura do SQL. Ex: `modelos`.

O segundo método é o `down()`, que chama internamente o método `dropTable()`. Se você já teve a oportunidade de trabalhar com SQL, sabe que `DROP` é o comando para destruir uma tabela ou um banco inteiro. Portanto, se executarmos esse método, ele destruirá uma tabela. Altere o nome da string para o padrão de nomeclatura do SQL. Ex: `modelos`.

### Enviando alterações para o banco de dados

Nossa migração foi criada automaticamente e agora temos que passar essas alterações para o banco. Vamos executar essa migração no terminal.

O comando para rodar a migração é o seguinte: <br/>
`npx sequelize-cli db:migrate`

Tipos de dados do Sequelize:
- <a href="https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types">Lista de tipos de dados do sequelize</a>
- <a href="https://sequelize.org/docs/v6/other-topics/other-data-types/">Data types específicos</a>

Migrações e seeds:
- <a href="https://sequelize.org/docs/v6/other-topics/migrations/#running-migrations">Documentação do sequelize sobre migrações</a>
- <a href="https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-seed">Documentação do sequelize sobre seeds</a>
