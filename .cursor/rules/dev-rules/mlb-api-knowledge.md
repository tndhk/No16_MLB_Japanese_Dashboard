# MLB API ナレッジ共有

---

## 1. 基本API一覧

### 1-1. 選手ID検索API
- **用途**: 選手名からMLB選手IDを取得
- **エンドポイント**: `https://statsapi.mlb.com/api/v1/people/search?names={name}`
  - 例: `...?names=Ohtani`
- **主なレスポンス**:
```json
{
  "people": [
    {
      "id": 660271,
      "fullName": "Shohei Ohtani",
      ...
    }
  ]
}
```
- `people[0].id`がMLB選手ID

### 1-2. 選手成績取得API
- **用途**: 指定選手・年度の成績（打者/投手）を取得
- **エンドポイント**: `https://statsapi.mlb.com/api/v1/people/{playerId}/stats?stats=season&season={year}`
  - `group=hitting`（打者成績）
  - `group=pitching`（投手成績）
- **主なレスポンス**:
```json
{
  "stats": [
    {
      "group": { "displayName": "hitting" },
      "splits": [
        {
          "stat": { ... },
          "team": { "name": "Angels" },
          "player": { "fullName": "Shohei Ohtani" }
        }
      ]
    }
  ]
}
```

---

## 2. 主な成績項目一覧

### 2-1. バッター
- `avg`（打率）
- `hr` / `homeRuns`（本塁打）
- `rbi`（打点）
- `obp`（出塁率）
- `ops`（OPS）
- `ab` / `atBats`（打数）
- `h` / `hits`（安打数）
- `bb` / `baseOnBalls`（四球）
- `sb` / `stolenBases`（盗塁）
- `war`（WAR）

### 2-2. ピッチャー
- `era`（防御率）
- `whip`（WHIP）
- `k` / `strikeOuts`（奪三振）
- `wl`（勝敗：`wins`-`losses`）
- `g` / `gamesPlayed`（登板数）
- `ip` / `inningsPitched`（投球回）
- `k9` / `strikeoutsPer9Inn`（K/9）
- `bb9` / `baseOnBallsPer9`（BB/9）

---

## 3. データ構造のポイント
- `stats[0].group.displayName`で「hitting」か「pitching」かを判別
- `splits[0].stat`に各種成績がまとまっている
- チーム名は`splits[0].team.name`、選手名は`splits[0].player.fullName`
- 年度やグループ（hitting/pitching）はURLパラメータで指定

---

## 4. 参考リンク
- [MLB公式Stats APIドキュメント](https://statsapi.mlb.com/docs/)
- [MLB-StatsAPI（GitHub）](https://github.com/toddrob99/MLB-StatsAPI)
- [MLB Data API（非公式まとめ）](https://appac.github.io/mlb-data-api-docs/)

---

> ※ このドキュメントはAPI仕様や取得項目の追加・変更に合わせて随時アップデートしてください。 