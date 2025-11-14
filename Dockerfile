# ---- DEV STAGE ----
FROM oven/bun:1.3 AS dev

WORKDIR /app

# Copy dependencies first (best caching)
COPY bun.lock package.json ./

RUN bun install

# Copy all project files
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
