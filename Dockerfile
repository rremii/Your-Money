FROM node:18-alpine

WORKDIR /app

COPY package*.json ./


RUN yarn

#RUN yarn build

#COPY ./dist .

COPY . .

EXPOSE 8000

CMD [ "yarn", "dev" ]