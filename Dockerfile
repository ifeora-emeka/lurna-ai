FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps && npm cache clean --force

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p /app/database && chown -R nextjs:nodejs /app/database

COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/migrations ./migrations
COPY --from=builder --chown=nextjs:nodejs /app/config.js ./config.js
COPY --from=builder --chown=nextjs:nodejs /app/.sequelizerc ./.sequelizerc
COPY --from=builder --chown=nextjs:nodejs /app/migrate-production.js ./migrate-production.js

COPY --from=builder --chown=nextjs:nodejs /app/start.sh ./start.sh

RUN chmod +x start.sh

RUN mkdir -p /data && chown -R nextjs:nodejs /data

USER nextjs

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["./start.sh"]