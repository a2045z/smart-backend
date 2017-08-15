#!/bin/bash

dbpath=~/data/smart-api/db
mkdir -p $dbpath
base=$(realpath -- "$(dirname -- $0)/..")
port=23211

docker run --rm \
  -d \
  -v $dbpath:/data/db:rw \
  --name smart.mongo \
  mongo:3.4.7 2> /dev/null; true

ip=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' smart.mongo)

docker run --rm \
  -e MONGO_URL=mongodb://$ip:27017/smart \
  -it \
  --name smart-api-server \
  -w /code \
  -v $base:/code \
  -p $port:$port \
  mhart/alpine-node:8.2.1 \
  sh -c "yarn && yarn nodemon server.js"