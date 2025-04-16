- [x] public/players.jsonの作成
  - 日本人MLB選手の名前とIDをJSONで記載
  - 例: Shohei Ohtani, Seiya Suzuki など
  - 🟢 通常

- [x] ディレクトリ構成・初期セットアップ
  - Next.js, TypeScript, Tailwind CSS, Shadcn/uiの導入
  - 必要なディレクトリ・ファイルの作成
  - 🟢 通常

- [x] MLB API通信ロジックの実装（utils/fetchStats.ts）
  - 指定IDの選手データをAPIから取得
  - 年度は動的に取得
  - エラー時の処理も実装
  - 🟡 重要

- [x] PlayerCardコンポーネントの作成
  - バッター/ピッチャー両対応
  - 必要な指標（AVG, HR, ERA等）を表示
  - 🟡 重要

- [x] ダッシュボードUIの作成
  - 選手一覧をテーブルまたはカードで表示
  - レスポンシブ対応
  - 🟡 重要

- [x] エラーハンドリング・ローディングUIの実装
  - APIエラー時の表示
  - ローディング中のUI
  - 🟢 通常

- [x] 型安全性・アクセシビリティ対応
  - TypeScript型定義
  - ARIA属性等のアクセシビリティ考慮
  - 🟢 通常

- [x] Dockerfile作成（ローカル開発・本番対応）
  - Node.js公式イメージ利用、依存インストール、ビルド、本番起動
  - EXPOSE 3000
  - 🟢 通常

- [x] public/players.jsonのホットリロード対応（Dockerボリュームマウント運用メモ）
  - docker run時に -v $(pwd)/public/players.json:/app/public/players.json を指定
  - players.json編集後、即座に反映
  - 🟢 通常

- [ ] デプロイ準備（Vercel想定）
  - 本番ビルド・環境変数の確認
  - 🟢 通常 