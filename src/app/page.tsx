import { PlayerCard } from "@/components/PlayerCard";
import { fetchStats, PlayerStats } from "@/utils/fetchStats";
import fs from "fs/promises";
import path from "path";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Suspense } from "react";

type PlayerJson = { name: string; id: number; twoWay: boolean };

async function getPlayers(): Promise<PlayerJson[]> {
  const filePath = path.join(process.cwd(), "public", "players.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as PlayerJson[];
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

export default async function Home() {
  let errorMsg = "";
  let allStats: PlayerStats[] = [];
  try {
    const players = await getPlayers();
    const year = new Date().getFullYear();
    // twoWayならhitting/pitching両方、そうでなければhitting→pitchingの順で取得
    const statsPromises = players.flatMap((p) => {
      if (p.twoWay) {
        return [
          fetchStats(p.id, year, "hitting"),
          fetchStats(p.id, year, "pitching"),
        ];
      } else {
        // まずhittingを試し、なければpitching
        return [
          fetchStats(p.id, year, "hitting").then(
            (res) => res ?? fetchStats(p.id, year, "pitching")
          ),
        ];
      }
    });
    const statsList = await Promise.all(statsPromises);
    // null除外＆同じ選手・typeの重複除外
    const seen = new Set<string>();
    allStats = statsList.filter((s): s is PlayerStats => {
      if (!s) return false;
      const key = s.name + s.type;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } catch {
    errorMsg = "選手データの取得に失敗しました";
  }

  if (errorMsg) {
    toast.error(errorMsg);
  }

  const batters = allStats.filter((s) => s.type === "batter");
  const pitchers = allStats.filter((s) => s.type === "pitcher");

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
              {batters.map((stats) => (
                <PlayerCard key={stats.name + stats.type} stats={stats} type="batter" />
              ))}
            </div>
          )}

          <h2 className="text-2xl font-bold mb-4 mt-8">投手</h2>
          {pitchers.length === 0 ? (
            <div className="p-4 border rounded text-center text-red-500">投手データ取得エラー</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {pitchers.map((stats) => (
                <PlayerCard key={stats.name + stats.type} stats={stats} type="pitcher" />
              ))}
            </div>
          )}
        </section>
      </Suspense>
    </>
  );
}
