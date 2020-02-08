FROM node:11

ENV HTTP_PROXY "http://10.70.64.193:9090/"
ENV HTTPS_PROXY "http://10.70.64.193:9090/"
ENV NO_PROXY "localhost,.corp.nai.org,.internalzone.com,.corp.mcafee.com,172.17.0.1"


# docker build -t bbittiker/node-api-server .
# docker run  -p 3000:3000 -i -t bbittiker/node-api-server:latest

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


RUN npm install
#RUN apt-get update && apt-get install apt-file -y && apt-file update && apt-get install vim -y && npm install
#RUN apt-get install vim -y && npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY ./config/.env.docker.local ./.env
COPY ./src .
COPY config /usr/app/config
COPY migrations /usr/app/migrations
COPY seeders /usr/app/seeders

EXPOSE 3000
#CMD [ "npm", "run", "start-dev" ]
CMD [ "npm", "run", "start-docker-local" ]




