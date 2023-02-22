#
# BUILD CONTAINER
#
FROM node:16 as base
USER node
ENV NODE_ENV production
WORKDIR /app
COPY --chown=node:node package.json yarn.lock tsconfig*.json ./
RUN yarn install --immutable 
COPY --chown=node:node . .
RUN yarn run build

#
# PRODUCTION CONTAINER
#
FROM node:16-alpine as production
USER node
COPY --chown=node:node --from=base /app/node_modules ./node_modules
COPY --chown=node:node --from=base /app/build ./build
CMD [ "node", "build/index.js" ]
