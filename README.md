# api-bootcamp-igti

##### O que tem de interessante neste projeto

- Projeto desenvolvido em todo em typscript
- Gerenciamento de erros > infra > middleware
- Validação de fields > domain > validation
- Gerenciamento de logs > > infra > middleware
- Testes de domínio e repositorios
- Hooks validando testes e eslint em commits e push
- As models foram desenvolvidas mediante injeção de dependência (Dá para melhorar)

#### Como usar este projeto

- `$ git clone https://github.com/ALESSANDROLMENEZES/api-bootcamp-igti.git`

- `$ cd api-bootcamp-igti`

- `$ npm install`

- `$ npm run test`

- `$ npm dev:server`

##### Todas as informações são salvas em um arquivo json na camada de infra > data

Informações de log são salvas em um arquivo information-logs.log na raiz do projeto

#### Rotas disponíveis

- GET
- PUT
- POST
- DELETE

`http://localhost:3000/api/accounts`

- GET
- PUT
- POST
- DELETE

`http://localhost:3000/api/grades`

- GET

`http://localhost:3000/api/grades/nota-total-aluno/:student/:subject`

`http://localhost:3000/api/grades/melhores-grades/:type/:subject`

`http://localhost:3000/api/grades/media-grade/:type/:subject`

##### Grades

``` json
  {
    "id": 26,
    "student": "Roberto Achar",
    "subject": "02 - Node",
    "type": "Fórum",
    "value": 17,
    "timestamp": "2020-05-19T18:21:25.128Z"
  }
```

##### Accounts

``` json
  {
    "id": 1,
    "user": "Junior Ribeiro",
    "saldo": 189
  }
```
