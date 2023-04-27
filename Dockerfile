FROM node:latest

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g nodemon

EXPOSE 8000

CMD [ "npm", "start" ]
