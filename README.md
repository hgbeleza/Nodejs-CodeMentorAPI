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
  "config": path.resolve("./src/config", "config.json"),
  "models-path": path.resolve("./src/models"),
  "seeders-path": path.resolve("./src/seeders"),
  "migrations-path": path.resolve("./src/migrations"),
};
```

Execute o comando pra iniciar o sequelize: `npx sequelize-cli init`. Dentro da pasta src, foi criado quatro pastas: `config`, `models`, `seeders` e `migrations`. Dentro da pasta config tem um arquivo `config.json` que serve para fazer a conexão com o banco de dados.

- <a target="_blank" href="https://www.alura.com.br/artigos/dotenv-gerenciando-variaveis-ambiente?_gl=1*z5oqd*_ga*MTMyNjk1NDcyNi4xNzA4NzA2MjY3*_ga_1EPWSW3PCS*MTcxMDk0NTExNC45LjEuMTcxMDk0OTY0OS4wLjAuMA..*_fplc*emxCU1llNEQxUzdUQ1ZSNUtTaUxFSkhXQjdObEYzVm1SeTZDY01xQ2FVWFdTcU82Q3dmN09QR3Y0NmRzJTJGVTElMkZrZzRoc2psOVpENlBnRXZ6SXlnN2NISVZYY2xON1p1JTJCWXFUdUVNQ2duT2dDT242N0tVVG5acHhiaUFCZjVRJTNEJTNE">Como utilizar variáveis de ambiente em JavaScript</a>
- <a href="https://sequelize.org/docs/v6/getting-started/#installing">Lista de banco de dados compatíveis com sequelize</a>
- <a href="https://alura.com.br/artigos/sql-injection-proteja-sua-aplicacao?_gl=1*1dzkyvn*_ga*MTMyNjk1NDcyNi4xNzA4NzA2MjY3*_ga_1EPWSW3PCS*MTcxMDk0NTExNC45LjEuMTcxMDk1MDI3NS4wLjAuMA..*_fplc*emxCU1llNEQxUzdUQ1ZSNUtTaUxFSkhXQjdObEYzVm1SeTZDY01xQ2FVWFdTcU82Q3dmN09QR3Y0NmRzJTJGVTElMkZrZzRoc2psOVpENlBnRXZ6SXlnN2NISVZYY2xON1p1JTJCWXFUdUVNQ2duT2dDT242N0tVVG5acHhiaUFCZjVRJTNEJTNE">SQL injection</a>: entenda uma das falhas de segurança mais comuns e que é tratado internamente por ORMs como Sequelize;