#https://medium.com/codex/run-your-docker-containers-for-free-in-the-cloud-and-for-unlimited-time-361515cb0876
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./


RUN yarn

#RUN yarn build

#COPY ./dist .

COPY . .

EXPOSE 8000

CMD [ "yarn", "dev" ]