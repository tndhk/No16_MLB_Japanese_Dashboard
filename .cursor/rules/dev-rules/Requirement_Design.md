
s## 🧩 System Overview

A web dashboard that:
- Loads a preset list of Japanese MLB players (by name & ID) from a JSON file.
- Queries the MLB API for each player's **current season stats**.
- Displays them in a table or card layout with key performance indicators.

---

## 🔧 Functional Requirements

### 1. **Player Data Management**
- Maintain a JSON file with Japanese players' names and MLB API IDs.
- Example:
```json
[
  { "name": "Shohei Ohtani", "id": 545361 },
  { "name": "Seiya Suzuki", "id": 673548 }
]
```

### 2. **Stats Fetching API**
- Fetch each player's stats with:
```bash
GET https://statsapi.mlb.com/api/v1/people/{player_id}/stats?stats=season&season={year}
```

- For season: Use current year dynamically (`new Date().getFullYear()`)

### 3. **Dashboard UI**
- Show player name, team, position.
- Show key stats:
  - For batters: AVG, HR, RBI, OBP, OPS
  - For pitchers: ERA, WHIP, K, W-L
- Update automatically on page load.

---

## 🧱 Tech Stack (suggested)

- **Frontend**: Next.js + React + Tailwind CSS + Chart.js (or Shadcn/ui)
- **Backend/API**: Edge Functions or Server Actions (optional; can be frontend-only)
- **Data**: Static JSON file in `public/` or fetched from Supabase/Firestore if needed later
- **Deployment**: Vercel (perfect fit for Next.js)

---

## 📦 File Structure Example

```
/pages
  index.tsx ← main dashboard
/public
  players.json ← Japanese player data
/utils
  fetchStats.ts ← MLB API interaction
/components
  PlayerCard.tsx
```

---

## 📋 Tasks To Build It

- [ ] public/players.jsonの作成
  - 日本人MLB選手の名前とIDをJSONで記載
  - 例: Shohei Ohtani, Seiya Suzuki など
  - 🟢 通常

- [ ] ディレクトリ構成・初期セットアップ
  - Next.js, TypeScript, Tailwind CSS, Shadcn/uiの導入
  - 必要なディレクトリ・ファイルの作成
  - 🟢 通常

- [ ] MLB API通信ロジックの実装（utils/fetchStats.ts）
  - 指定IDの選手データをAPIから取得
  - 年度は動的に取得
  - エラー時の処理も実装
  - 🟡 重要

- [ ] PlayerCardコンポーネントの作成
  - バッター/ピッチャー両対応
  - 必要な指標（AVG, HR, ERA等）を表示
  - 🟡 重要

- [ ] ダッシュボードUIの作成
  - 選手一覧をテーブルまたはカードで表示
  - レスポンシブ対応
  - 🟡 重要

- [ ] エラーハンドリング・ローディングUIの実装
  - APIエラー時の表示
  - ローディング中のUI
  - 🟢 通常

- [ ] 型安全性・アクセシビリティ対応
  - TypeScript型定義
  - ARIA属性等のアクセシビリティ考慮
  - 🟢 通常

- [ ] デプロイ準備（Vercel想定）
  - 本番ビルド・環境変数の確認
  - 🟢 通常

