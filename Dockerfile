FROM node:16.13.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["node", "./dist/src/main.js"]
