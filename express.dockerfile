FROM node:lts-alpine3.14

WORKDIR /usr/src/app

RUN mkdir docker-uploads

ARG EXPRESS_PORT

EXPOSE ${EXPRESS_PORT}

COPY package.json yarn.lock ./

RUN yarn install

COPY server.js .

COPY apollo ./apollo/

COPY express ./express/

CMD ["node", "server.js"]