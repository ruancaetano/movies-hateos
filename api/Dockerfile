FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn cache clean && yarn install

COPY . . 

EXPOSE 8080

CMD [ "yarn", "start:dev" ]