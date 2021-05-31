FROM node:lts-alpine3.13

WORKDIR /usr/src/app

COPY package.json .

RUN npm install && \
    npm install -g typescript

ADD . /usr/src/app

RUN tsc

CMD [ "npm", "start" ]

