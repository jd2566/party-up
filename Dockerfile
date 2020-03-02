FROM node:10

WORKDIR /usr/app

COPY package.json ./
COPY ./docker/ormconfig.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm install pm2 -g
RUN npm install copyfiles -g

COPY . .

RUN npm run build

RUN npm run copy-views

EXPOSE 3000

CMD ["pm2-runtime","dist/index.js"]
