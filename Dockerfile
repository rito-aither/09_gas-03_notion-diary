FROM node:alpine

RUN npm -v

WORKDIR /opt/src

RUN \
  npm install -g @google/clasp
