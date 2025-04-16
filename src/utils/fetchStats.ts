export type PlayerStats = {
  name: string;
  team: string;
  type: 'batter' | 'pitcher';
  // バッター用
  avg?: string;
  hr?: number;
  rbi?: number;
  obp?: string;
  ops?: string;
  ab?: number;
  h?: number;
  bb?: number;
  sb?: number;
  war?: number;
  // ピッチャー用
  era?: string;
  whip?: string;
  k?: number;
  wl?: string;
  g?: number;
  ip?: string;
  k9?: number;
  bb9?: number;
};

/**
 * 指定した選手ID・年・groupのMLB成績を取得
 * @param playerId MLB APIの選手ID
 * @param year 取得する年度（例: 2024）
 * @param group 'hitting' or 'pitching'（省略時はどちらか一方のみ）
 */
export async function fetchStats(playerId: number, year: number, group?: 'hitting' | 'pitching'): Promise<PlayerStats | null> {
  let url = `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=${year}`;
  if (group) url += `&group=${group}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    const statGroup = data?.stats?.[0];
    const split = statGroup?.splits?.[0];
    const stat = split?.stat;
    if (!statGroup || !split || !stat) return null;
    const groupName = statGroup.group?.displayName;
    const team = split?.team?.name || "";
    const name = split?.player?.fullName || "";
    if (groupName === "pitching") {
      // ピッチャー
      return {
        name,
        team,
        type: "pitcher",
        era: stat.era,
        whip: stat.whip,
        k: stat.strikeOuts,
        wl: stat.wins + "-" + stat.losses,
        g: stat.gamesPlayed,
        ip: stat.inningsPitched,
        k9: stat.strikeoutsPer9Inn,
        bb9: stat.baseOnBallsPer9,
      };
    } else if (groupName === "hitting") {
      // バッター
      return {
        name,
        team,
        type: "batter",
        avg: stat.avg,
        hr: stat.homeRuns,
        rbi: stat.rbi,
        obp: stat.obp,
        ops: stat.ops,
        ab: stat.atBats,
        h: stat.hits,
        bb: stat.baseOnBalls,
        sb: stat.stolenBases,
        war: stat.war,
      };
    } else {
      return null;
    }
  } catch (e) {
    console.error("fetchStats error", e);
    throw e;
  }
} 