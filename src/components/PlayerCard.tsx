import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlayerStats } from "@/utils/fetchStats";

interface PlayerCardProps {
  stats: PlayerStats;
}

export function PlayerCard({ stats }: PlayerCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto mb-4" role="region" aria-label={`${stats.name}の成績`}>
      <CardHeader>
        <CardTitle>{stats.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {stats.team} / {stats.position}
        </div>
      </CardHeader>
      <CardContent>
        {stats.position === "P" ? (
          // ピッチャー
          <div className="grid grid-cols-2 gap-2">
            <Stat label="ERA" value={stats.era} />
            <Stat label="WHIP" value={stats.whip} />
            <Stat label="K" value={stats.k} />
            <Stat label="W-L" value={stats.wl} />
          </div>
        ) : (
          // バッター
          <div className="grid grid-cols-2 gap-2">
            <Stat label="AVG" value={stats.avg} />
            <Stat label="HR" value={stats.hr} />
            <Stat label="RBI" value={stats.rbi} />
            <Stat label="OBP" value={stats.obp} />
            <Stat label="OPS" value={stats.ops} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-bold text-lg" aria-live="polite">{value ?? "-"}</span>
    </div>
  );
} 