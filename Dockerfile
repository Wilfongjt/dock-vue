FROM node:carbon

# Create app directory
WORKDIR /usr/src/app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json /usr/src/app/

ADD . /usr/src/app/

# Eventually we want NPM install outside of docker
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

ENV NODE_ENV=production

RUN npm run prodBuild

# Remove unused directories
RUN rm -rf ./src
RUN rm -rf ./build


# Bundle app source
# COPY . /usr/src/app/

EXPOSE 8080

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
