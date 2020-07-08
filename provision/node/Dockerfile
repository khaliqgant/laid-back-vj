FROM node:8

USER root

RUN npm install -g forever

COPY . /src
WORKDIR /src

RUN npm install
RUN npm run build

RUN chown -R node:node /src
VOLUME /src/storage
USER node

CMD ["forever", "/src/app.js"]
