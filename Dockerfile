FROM node:alpine

# the server
COPY ./deployment/server /app
COPY ./assets /app/public/assets
COPY ./index.html /app/public/

# copy files for building the phaser game
COPY ./package.json /fursorger/
COPY ./package-lock.json /fursorger/
COPY ./tsconfig.json /fursorger/
COPY ./webpack.config.js /fursorger/
COPY ./src /fursorger/src

# build the phaser game and expose publicly
WORKDIR /fursorger
RUN npm install 
RUN npm run build
RUN mv build ../app/public/build
RUN rm -r /fursorger

# install and run the server
WORKDIR /app
RUN npm install
CMD ["npm","run", "start"]
