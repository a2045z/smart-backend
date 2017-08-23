FROM mhart/alpine-node:8.2.1

WORKDIR /code

COPY package.json package.json
COPY server.js server.js
COPY plugins plugins

RUN yarn

CMD node server.js
