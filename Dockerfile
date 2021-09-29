FROM node:15

RUN mkdir /src
RUN mkdir /src/server

WORKDIR /src

COPY /server/package.json /server/package-lock.json ./server/
RUN npm install --prefix server && npm install bcrypt --prefix server 

COPY . .

EXPOSE 8080
CMD npm run migrate:dev && npm run generate:server && npm run build:server && npm run start:server