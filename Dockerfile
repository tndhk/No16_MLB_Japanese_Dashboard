# Node.js公式の軽量イメージを使用
FROM node:20-alpine AS base
WORKDIR /app

# 依存ファイルをコピー
COPY package.json package-lock.json ./

# 依存インストール
RUN npm ci

# ソースコードをコピー
COPY . .

# Next.jsビルド
RUN npm run build

# 本番用イメージ
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 必要なファイルのみコピー
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.ts ./
COPY --from=base /app/components.json ./

EXPOSE 3001

CMD ["npx", "next", "start", "-p", "3001"] 