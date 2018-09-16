ARG VERSION

FROM node:${VERSION} as node

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime \
  && echo ${TZ} > /etc/timezone

RUN apk update \
  && apk upgrade \
  && apk add --no-cache make git \
  && rm -rf /var/cache/apk/*

ARG DOCKER_PROJECT_DIR
WORKDIR ${DOCKER_PROJECT_DIR}

ARG NODE_PORT
EXPOSE ${NODE_PORT}

CMD ["npm", "run", "dev"]
