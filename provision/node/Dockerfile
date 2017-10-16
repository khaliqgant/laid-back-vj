FROM node:8

COPY . /srv/app
WORKDIR /srv/app

RUN npm i

CMD ["/srv/app/node_modules/nodemon/bin/nodemon.js", "srv/app/bin/www"]
