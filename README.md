# an-awesome-api
API Rest desenvolvida com o intuito de fornecer dados para um front-end específico, que será um e-commerce.

## O que foi desenvolvido:
Todo o servidor da API pode ser conteinerizado através do **Dockerfile** e **Docker Compose** presentes na raíz do projeto, e é integrado a um _banco de dados relacional_, no caso o _**PostgreSQL**_, que é gerado a partir de uma imagem em **Docker** (postgres:13-alpine).

No contexto deste projeto, existem duas APIs de fornecedores distintas as quais os dados não conversam entre si. Logo, esta API foi criada com o intuito de receber dinamicamente dados de terceiros e normaliza-los a fim de dispor ao Front-End, assim como lidar com tudo relativo a usuários, compras, login e etc.
Com poucos passos é possível adicionar um novo fornecedor editando o arquivo `./prisma/seeds/generators/generator.ts`.

| _Obs: Por motivos didáticos, as APIs foram Mockadas no diretório `./prisma/seeds/generators/` e simula o **fetch** através de **Promises**_.

### Techs utilizadas:
- _**ORM Prisma**_ por sua versatilidade e praticidade em implementar Models e Queries;
- _**Node + ExpressJs + TypeScript**_, uma combinação simples de implementar e compreender utilizando MSC;
- _**Joi**_ para dinamizar validações de forma rápida;
- _**Argon, uuid e JsonWebToken**_ a fim de implementar uma troca de dados mais segura;
- _**Decorators Express**_ para "enxugar" a composição dos _Routers_;
- _**Docker**_ por oferecer uma solução conveniente para rodar o resultado final com eficácia.

### Como utilizar:
  | Clone o projeto e certifique-se que as portas **5432** e **3001** estejam livres.
  - Dentro do diretório do projeto, rode o comando:
    -  `docker-compose up` ou com a flag `docker-compose up -d` (destaca o container em segundo plano).

### Ao finalizar:
| Ainda no diretório, derrube o conteiner e apague as imagens e networks geradas com o seguinte comando:
```
docker-compose down && docker image rm an-awesome-api postgres:13-alpine node:14-alpine
```

### Rotas disponíveis:
Acesse `localhost:3001` através de um _Client_ (Thunder Client, Postman...) caso queira conferir as rotas.
  #### > Produtos e Categorias de produtos
  - `GET /categories` Busca todas as categorias de produtos;
  - `GET /products` Busca todos os produtos;
  - `GET /products/query?name={value}` Busca todos os produtos que contenham o termo de busca no nome;
  - `GET /products/category/{categoryName}` Busca todos os produtos de uma categoria específica;
  - `GET /products/{:id}` Busca um produto específico por seu identificar.
  
  #### > Usuários
  - `GET /users` Busca os dados de um usuário logado
  - `GET /users/infos` Busca informações de compras. endereços e cartões cadastrados de um usuário logado

  | Ambas rotas acima necessitam receber o **email** no _**Body**_ da requisição e o **token** na chave _**authorization**_ do _**Headers**_:
  ```json
  // GET /users
  // GET /users/infos
  {
    "headers": { "authorization": "00d8d7f.87f6f7ffmnwnde09-ce8fc7fe9kO.Ol" },
    "body": { "email": "legendofzelda@hotmail.com" }
  }
  ```
  
  - `POST /users` Cria um novo usuário ou reativa um usuário inativo

  | Necessita receber o _**Body**_ no seguinte formato:
  ```json
  // POST /users
  {
    "body" : {
      "email": "somais@gmail.com", // em formato válido
      "name": "Somais",
      "lastName": "Um Silva",
      "hash": "queaEstrelaNaoBrilha123", // minimo 6 caracteres
      "cpf": "123.456.789-01", // chave cpf opcional, em formato válido
    }
  }
  ```
  - `PUT /users` Atualiza dados de um usuário logado
  
  | Necessita receber o **token** na chave _**authorization**_ do _**Headers**_ e o _**Body**_ no seguinte formato:
  ```json
  // PUT /users
  {
    "headers": { "authorization": "vtY7654.vx5wJY6700.ce8f-cghghT.01" },
    "body" : {
      "email": "somais@gmail.com", // em formato válido
      "name": "Thomas",
      "lastName": "Silva",
      "hash": "queaEstrelaNaoBrilha123", // chave hash opcional, minimo 6 caracteres
      "cpf": "123.456.789-01", // chave cpf opcional, em formato válido
    }
  }
  ```
  - `DELETE /users` Desativa um usuário, deletando suas informações adicionais do banco de dados
  
  | Necessita receber o **token** na chave _**authorization**_ do _**Headers**_ e o _**Body**_ no seguinte formato:
  ```json
  // PUT /users
  {
    "headers": { "authorization": "vtY7654.vx5wJY6700.ce8f-cghghT.01" },
    "body" : {
      "email": "somais@gmail.com", // em formato válido
      "name": "Thomas",
      "lastName": "Silva",
      "hash": "queaEstrelaNaoBrilha123", // chave hash opcional, minimo 6 caracteres
      "cpf": "123.456.789-01", // chave cpf opcional, em formato válido
    }
  }
  ```
  
  - `GET /users/{:email}` Busca apenas a condição atual de um usuário (ativo ou inativo)

| _**ReadMe em construção...**_
