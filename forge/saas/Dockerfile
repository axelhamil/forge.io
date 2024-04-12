FROM node:20.11.1-alpine AS base

RUN apk update \
    && apk add --no-cache libc6-compat \
    && npm install pnpm turbo --global \
    && pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner

WORKDIR /app

COPY .. .

RUN turbo prune --scope=saas --docker

FROM base AS builder

WORKDIR /app

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN turbo build --scope=saas...

RUN pnpm prune --prod --no-optional
#RUN rm -rf ./**/*/src

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app

COPY --from=builder --chown=nodejs:nodejs /app .

COPY --chown=nodejs:nodejs /apps/saas/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /app/apps/saas

ARG PORT=3030
ARG NODE_ENV=production
ENV PORT=${PORT} \
    NODE_ENV=${NODE_ENV}
EXPOSE ${PORT}

CMD ["docker-entrypoint.sh"]

FROM base AS dev

WORKDIR /app

COPY .gitignore .gitignore
COPY turbo.json turbo.json
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install

COPY --from=pruner /app/out/full/ .

CMD ["turbo", "dev"]
