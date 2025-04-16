# MLB日本人選手ダッシュボード

## 概要
日本人MLB選手の成績を一覧・詳細表示するNext.js製ダッシュボードです。

## 技術スタック
- Next.js (v14.2.25)
- React (v18.2.0)
- TypeScript (v5.2.2)
- Tailwind CSS, Shadcn/ui, Radix UI, Lucide React
- Prisma, SQLite
- Docker

## セットアップ手順

### 1. 必要な環境
- Node.js (推奨: v18以降)
- Docker, docker-compose

### 2. 開発環境の起動
```sh
docker-compose up dev
```

### 3. 主要コマンド
| コマンド                | 説明                     |
|------------------------|--------------------------|
| `docker-compose up dev`| 開発サーバ起動           |
| `docker-compose up app`| 本番サーバ起動           |
| `npx prisma migrate`   | DBマイグレーション       |
| `npx prisma studio`    | DB管理UI                 |

### 4. ディレクトリ構成（抜粋）
```
src/
├── app/           # ルーティングとページ
├── components/    # UIコンポーネント
├── hooks/         # カスタムフック
├── lib/           # ユーティリティ
├── dal/           # Data Access Layer
└── public/        # 静的アセット
```

### 5. 環境変数
- `.env`ファイルをルートに配置してください。
- 公開して良い変数は`NEXT_PUBLIC_`で始めてください。

### 6. よくあるトラブルシュート
- **Dockerのボリューム問題**: `node_modules`はコンテナ内で管理されます。
- **エイリアス解決エラー**: `tsconfig.json`の`paths`設定とDockerのマウント設定を確認してください。
- **DB接続エラー**: Prismaの設定やマイグレーションを再確認してください。

### 7. ライセンス
MIT
