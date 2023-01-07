FROM node:14-alpine

WORKDIR /usr/src/app/vue-comments
# Установка Git
RUN apk update
RUN apk add git
# Установка пакетов front-end
COPY package*.json ./
RUN npm install

COPY . .

# Установка пакетов server-api
RUN git clone https://github.com/EvgeniySaschenko/comments-api-server.git
WORKDIR /usr/src/app/vue-comments/comments-api-server
RUN npm install

WORKDIR /usr/src/app/vue-comments