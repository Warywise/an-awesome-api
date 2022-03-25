FROM node:14-alpine

WORKDIR /server

COPY package.json .

RUN npm install --silent

EXPOSE 3001

COPY . .

CMD [ "npm", "start"]
