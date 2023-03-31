FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci 

ENV SET DEBUG=playground:*
  
USER node
CMD npm start


