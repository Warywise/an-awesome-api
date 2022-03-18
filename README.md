# an-awesome-api
API Rest desenvolvida com o intuito de fornecer dados para um front-end específico, que será um e-commerce.

### Como rodar:
  - Primeiramente, instale as dependências necessárias com `npm install`;
  - Agora vamos gerar um DB "conteinerizado" com `docker-compose up` ou `docker-compose up -d` (para o container rode em segundo plano);
  - Para subir o schema ao DB e semeá-lo, foi criado um comando `npm run prestart` que fará esse trabalho;
  - Caso queira conferir o resultado no DB, basta rodar `npx prisma studio`, que abrirá uma interface gráfica em seu browser;
  - E por fim, para rodar finalmente a nossa API, utilize o comando `npm run dev`.
