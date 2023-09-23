FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

ARG db_url=foo
ENV DATABASE_URL=$db_url
ENV APP_URL=https://discontinuity.ai

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Production use node instead of root
# USER node
COPY . /usr/src/app

RUN npm install && npx prisma generate && npm run build

EXPOSE 3000
CMD [ "npm", "start" ]