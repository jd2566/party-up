FROM node:10

WORKDIR /usr/app

COPY package.json ./
COPY ./docker/ormconfig.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

RUN npm run build

EXPOSE 80

CMD ["pm2-runtime","dist/index.js"]
