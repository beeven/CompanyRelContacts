FROM node
ENV work /home
WORKDIR ${work}
COPY server ./server
COPY web/contacts2/dist ./web/contacts2/dist
EXPOSE 8020
CMD node server/server.js
