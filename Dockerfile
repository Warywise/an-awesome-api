FROM node:14-alpine

WORKDIR /server

COPY package.json .

RUN npm install

EXPOSE 3001

COPY . .

CMD [ "npm", "start"]
