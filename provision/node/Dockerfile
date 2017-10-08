FROM node:8

# Install nodemon
RUN npm install -g nodemon

ADD package.json /lbv/package.json
RUN cd /lbv && npm install --production
RUN mkdir -p /src && cp -a /lbv/node_modules /src/

WORKDIR /src
ADD . /src

CMD ["nodemon", "/src/bin/www"]
