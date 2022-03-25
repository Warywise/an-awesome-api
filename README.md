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
  - Dentro do diretório do projeto, rode o comando `docker-compose up` ou `docker-compose up -d` (para subir o container em segundo plano);

### Ao finalizar:
| Ainda no diretório, derrube o conteiner e apague as imagens e networks geradas com o seguinte comando:
```
docker-compose down && docker image rm an-awesome-api postgres:13-alpine node:14-alpine
```

### Rotas disponíveis:
  ##### Produtos e Categorias de produtos
  - `GET /categories` Busca todas as categorias de produtos;
  - `GET /products` Busca todos os produtos;
  - `GET /products/query?name={value}` Busca todos os produtos que contenham o termo de busca no nome;
  - `GET /products/category/{categoryName}` Busca todos os produtos de uma categoria específica;
  - `GET /products/{:id}` Busca um produto específico por seu identificar.

| _**ReadMe em construção...**_
