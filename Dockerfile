FROM node:20-bookworm-slim

WORKDIR /app

# Prisma needs a detectable OpenSSL runtime. Debian Bookworm provides OpenSSL 3
# consistently, unlike Alpine variants where Prisma may fall back to 1.1.x.
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src
COPY public ./public

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "src/index.js"]
