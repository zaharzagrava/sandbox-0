FROM node:current-slim

WORKDIR /usr/src/app

COPY package.json .

EXPOSE 4000

RUN npm install

RUN adduser myuser
USER myuser

CMD ["npm", "start"]


COPY . .