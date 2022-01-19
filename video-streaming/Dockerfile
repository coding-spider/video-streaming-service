FROM node:16.13.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY src ./src

COPY ../video-storage/videos ./videos

CMD npm start