
FROM node:14.17.4 AS dependencies
ENV NODE_ENV=development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --dev typescript

FROM node:14.17.4 AS builder
WORKDIR /app
COPY . .
RUN npm install 
ENV NODE_ENV=production
RUN npm run build

FROM node:14.17.4 AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node --from=builder /app/next.config.js ./
COPY --chown=node --from=builder /app/public ./public
COPY --chown=node --from=builder /app/.next ./.next
COPY --chown=node --from=builder /app/package-lock.json /app/package.json ./
COPY --chown=node --from=dependencies /app/node_modules ./node_modules
USER node
CMD [ "npm", "start" ]