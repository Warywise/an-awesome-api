# an-awesome-api
API Rest desenvolvida com o intuito de fornecer dados para um front-end específico, que será um e-commerce.

### Como rodar:
  - Dentro do diretório, rode o comando `docker-compose up` ou `docker-compose up -d` (para subir o container em segundo plano);

### Ao finalizar:
| Ainda no diretório, derrube o conteiner e apague as imagens e networks geradas com o seguinte comando:
```
docker-compose down && docker image rm an-awesome-api postgres:13-alpine node:14-alpine
```

#### Rotas disponíveis:
  - `GET /categories` Busca todas as categorias de produtos;
  - `GET /products` Busca todos os produtos;
  - `GET /products/query?name={value}` Busca todos os produtos que contenham o termo de busca no nome;
  - `GET /products/category/{categoryName}` Busca todos os produtos de uma categoria específica;
  - `GET /products/{:id}` Busca um produto específico por seu identificar.

| _**ReadMe em construção...**_
