FROM ubuntu:18.04

FROM node:14

WORKDIR /api_server_dev

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 4010

CMD npm run docker:test