#!/bin/bash

base=$(realpath -- "$(dirname -- $0)/..")

dbpath=$base/db
mkdir -p $dbpath

port=23211

docker run --rm \
  -d \
  -v $dbpath:/data/db:rw \
  --name smart.mongo \
  mongo:3.4.7 2> /dev/null; true

ip=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' smart.mongo)

docker run --rm \
  -e MONGO_URL=mongodb://$ip:27017/smart \
  -d \
  --name smart-api-server \
  -p $port:$port \
  smart-api:0.0.1
