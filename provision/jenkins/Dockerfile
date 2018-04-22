FROM jenkinsci/blueocean

ENV AWS_CLI_VERSION 1.11.131

USER root

RUN apk --no-cache update && \
    apk --no-cache add python py-pip py-setuptools ca-certificates groff less && \
    pip --no-cache-dir install awscli==${AWS_CLI_VERSION} && \
    rm -rf /var/cache/apk/*

RUN pip install awscli

ADD https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-linux-amd64-latest /usr/local/bin/ecs-cli

RUN chmod 555 /usr/local/bin/ecs-cli
