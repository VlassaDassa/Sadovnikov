ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-bookworm-slim

WORKDIR /app

RUN corepack enable

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm exec prisma generate
RUN pnpm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["pnpm", "run", "start"]