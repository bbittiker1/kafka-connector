FROM node:11

#ENV HTTP_PROXY "http://10.70.64.193:9090/"
#ENV HTTPS_PROXY "http://10.70.64.193:9090/"
#ENV NO_PROXY "localhost,.corp.nai.org,.internalzone.com,.corp.mcafee.com,172.17.0.1"

# Create app directory
WORKDIR /usr/app

RUN mkdir -p /usr/app/logs

COPY package*.json ./

RUN npm install
#RUN npm install --loglevel verbose

COPY ./src .
EXPOSE 3000
CMD [ "npm", "run", "start-server-docker" ]
