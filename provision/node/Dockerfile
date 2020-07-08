FROM node:8

USER root

RUN npm install -g forever

COPY . /src
WORKDIR /src

COPY ./provision/node/scripts/start.sh /start.sh
RUN chmod +x /start.sh

RUN npm install
RUN npm run build

RUN chown -R node:node /src

RUN echo "node:node" | chpasswd && adduser node sudo
RUN echo "node ALL=NOPASSWD: ALL" >> /etc/sudoers

USER node

CMD ["/start.sh"]
