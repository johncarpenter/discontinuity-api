FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

# populated with build-arg
ARG db_url=foo
ARG mailgun_key=foo

ENV DATABASE_URL=$db_url
ENV APP_URL=https://discontinuity.ai
ENV EMAIL_SERVER_API_KEY=$mailgun_key

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Production use node instead of root
# USER node
COPY . /usr/src/app

RUN npm install && npx prisma generate && npm run build

EXPOSE 3000
CMD [ "npm", "start" ]