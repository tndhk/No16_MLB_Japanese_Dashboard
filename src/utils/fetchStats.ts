export type PlayerStats = {
  name: string;
  team: string;
  position: string;
  // バッター用
  avg?: string;
  hr?: number;
  rbi?: number;
  obp?: string;
  ops?: string;
  // ピッチャー用
  era?: string;
  whip?: string;
  k?: number;
  wl?: string;
};

/**
 * 指定した選手ID・年のMLB成績を取得
 * @param playerId MLB APIの選手ID
 * @param year 取得する年度（例: 2024）
 */
export async function fetchStats(playerId: number, year: number): Promise<PlayerStats | null> {
  const url = `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=${year}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    const split = data?.stats?.[0]?.splits?.[0];
    const stat = split?.stat;
    if (!split || !stat) return null;
    const position = split?.position?.abbreviation || "";
    const team = split?.team?.name || "";
    const name = split?.player?.fullName || "";
    if (["P"].includes(position)) {
      // ピッチャー
      return {
        name,
        team,
        position,
        era: stat.era,
        whip: stat.whip,
        k: stat.strikeOuts,
        wl: stat.wins + "-" + stat.losses,
      };
    } else {
      // バッター
      return {
        name,
        team,
        position,
        avg: stat.avg,
        hr: stat.homeRuns,
        rbi: stat.rbi,
        obp: stat.obp,
        ops: stat.ops,
      };
    }
  } catch (e) {
    console.error("fetchStats error", e);
    throw e;
  }
} 