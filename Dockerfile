FROM oven/bun

WORKDIR /app

COPY package.json package.json

RUN bun remove butter-api
RUN bun install

COPY . .
ENV ORIGIN=https://dash.buttercup.boo
RUN bun run build

EXPOSE 3000
ENTRYPOINT ["bun", "./build"]