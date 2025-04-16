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

  return (
    <>
      <Toaster />
      <Suspense fallback={<LoadingSkeleton />}>
        <main className="max-w-4xl mx-auto py-8 px-2 grid gap-6 grid-cols-1 sm:grid-cols-2" role="main" aria-label="日本人MLB選手成績ダッシュボード">
          {statsList.length === 0 ? (
            <div className="p-4 border rounded text-center text-red-500">
              データ取得エラー
            </div>
          ) : (
            statsList.map((stats, i) =>
              stats ? (
                <PlayerCard key={stats.name + i} stats={stats} />
              ) : (
                <div key={i} className="p-4 border rounded text-center text-red-500">
                  データ取得エラー
                </div>
              )
            )
          )}
        </main>
      </Suspense>
    </>
  );
}
