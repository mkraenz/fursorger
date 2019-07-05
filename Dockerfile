FROM node:alpine
COPY ./deployment/server /app
COPY ./build /app/public/build
COPY ./assets /app/public/assets
COPY ./index.html /app/public
WORKDIR /app
RUN npm install
CMD ["npm","run", "start"]
