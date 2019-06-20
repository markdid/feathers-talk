ARG APP_DIR=/home/node/app

FROM node:slim
ARG APP_DIR
COPY ./src/ $APP_DIR