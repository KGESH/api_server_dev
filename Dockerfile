FROM node:14

WORKDIR /api_server_dev

COPY package*.json ./

RUN npm install --silent

COPY . .

CMD npm run deploy