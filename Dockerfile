FROM node:16-alpine3.11 AS build
# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /home permissions we have to create the dir with root and change perms
RUN mkdir /home/app && chown node:node /home/app
WORKDIR /home/app
RUN npm install -g --save @angular/cli@13.1.3
RUN apk add chromium
ENV CHROME_BIN='/usr/bin/chromium-browser'
# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app.
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
COPY package.json package-lock.json* ./
RUN rm -rf node_modules
RUN npm ci
ENV PATH /home/app/node_modules/.bin:$PATH
# copy in our source code last, as it changes the most
COPY --chown=node:node . .
RUN npm run build
CMD ng serve --host 0.0.0.0

FROM nginx:alpine
COPY --from=build /home/app/dist /opt/homebrew/Cellar/nginx/1.21.5/html
COPY --from=build /home/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM build as test
ENV CHROME_BIN='/usr/bin/chromium-browser'
RUN npm run test -- --watch=false --no-progress --browsers=ChromeHeadlessNoSandbox
