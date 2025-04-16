import { PlayerCard } from "@/components/PlayerCard";
import { fetchStats, PlayerStats } from "@/utils/fetchStats";
import fs from "fs/promises";
import path from "path";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Suspense } from "react";

async function getPlayers() {
  const filePath = path.join(process.cwd(), "public", "players.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as { name: string; id: number }[];
}

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-2 grid gap-6 grid-cols-1 sm:grid-cols-2">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="animate-pulse bg-muted rounded h-40" />
      ))}
    </div>
  );
}

function isPitcher(stats: PlayerStats) {
  return stats.position === "P";
}

export default async function Home() {
  let errorMsg = "";
  let statsList: (PlayerStats | null)[] = [];
  try {
    const players = await getPlayers();
    const year = new Date().getFullYear();
    statsList = await Promise.all(
      players.map((p) => fetchStats(p.id, year).catch(() => null))
    );
  } catch {
    errorMsg = "選手データの取得に失敗しました";
  }

  if (errorMsg) {
    toast.error(errorMsg);
  }

  // データ取得成功したものだけを分離
  const batters = statsList.filter((s): s is PlayerStats => !!s && !isPitcher(s));
  const pitchers = statsList.filter((s): s is PlayerStats => !!s && isPitcher(s));

  return (
    <>
      <Toaster />
      <Suspense fallback={<LoadingSkeleton />}>
        <section className="max-w-4xl mx-auto py-8 px-2">
          <h2 className="text-2xl font-bold mb-4">打者</h2>
          {batters.length === 0 ? (
            <div className="p-4 border rounded text-center text-red-500 mb-8">打者データ取得エラー</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-8">
              {batters.map((stats, i) => (
                <PlayerCard key={stats.name + i} stats={stats} type="batter" />
              ))}
            </div>
          )}

          <h2 className="text-2xl font-bold mb-4 mt-8">投手</h2>
          {pitchers.length === 0 ? (
            <div className="p-4 border rounded text-center text-red-500">投手データ取得エラー</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {pitchers.map((stats, i) => (
                <PlayerCard key={stats.name + i} stats={stats} type="pitcher" />
              ))}
            </div>
          )}
        </section>
      </Suspense>
    </>
  );
}
