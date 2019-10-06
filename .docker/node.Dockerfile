ARG VERSION
FROM node:${VERSION} as node

RUN apk update \
  && apk upgrade \
  && apk add --no-cache make git \
  && rm -rf /var/cache/apk/*

# Install frontend utils
RUN npm i -g npm

WORKDIR /workspace
