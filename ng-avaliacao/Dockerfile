#Fase 1 - compilando:
FROM node:12.7-alpine AS build

MAINTAINER Paulo Tosani

WORKDIR /usr/src/app

COPY package.json ./

ENV npm_config_loglevel silent

RUN npm install
RUN npm install --save-dev  --unsafe-perm node-sass

COPY . .

RUN npm run build

#Fase 2 - rodando:
FROM nginx:1.17.1-alpine

COPY --from=build /usr/src/app/dist/ng-avaliacao /usr/share/nginx/html
