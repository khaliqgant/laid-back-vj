FROM node:8

USER root

# Install nodemon
RUN npm install -g nodemon

COPY . /src
WORKDIR /src

RUN npm install --production

RUN chown -R node:node /src
USER node

CMD ["nodemon", "/src/bin/www"]
