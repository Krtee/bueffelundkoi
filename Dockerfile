
FROM node:18.17.1 AS dependencies
ENV NODE_ENV=development
WORKDIR /app
COPY package.json package-lock.json .env ./
RUN npm install --legacy-peer-deps --dev typescript

FROM node:18.17.1 AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ENV NODE_ENV=production
RUN npm run build

FROM node:18.17.1 AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node --from=builder /app/next.config.js ./
COPY --chown=node --from=builder /app/public ./public
COPY --chown=node --from=builder /app/.next ./.next
COPY --chown=node --from=builder /app/package-lock.json /app/package.json ./
COPY --chown=node --from=builder /app/node_modules ./node_modules
COPY --chown=node --from=builder /app/next-i18next.config.js ./
COPY --chown=node --from=builder /app/.env ./.env

USER node
CMD [ "npm", "start" ]