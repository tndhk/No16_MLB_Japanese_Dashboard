import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlayerStats } from "@/utils/fetchStats";

interface PlayerCardProps {
  stats: PlayerStats;
  type: 'batter' | 'pitcher';
}

export function PlayerCard({ stats, type }: PlayerCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto mb-4" role="region" aria-label={`${stats.name}の成績`}>
      <CardHeader>
        <CardTitle>{stats.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {stats.team} / {type === 'pitcher' ? '投手' : '打者'}
        </div>
      </CardHeader>
      <CardContent>
        {type === "pitcher" ? (
          // 投手指標
          <div className="grid grid-cols-2 gap-2">
            <Stat label="登板" value={stats.g} />
            <Stat label="IP" value={stats.ip} />
            <Stat label="ERA" value={stats.era} />
            <Stat label="WHIP" value={stats.whip} />
            <Stat label="K" value={stats.k} />
            <Stat label="K/9" value={stats.k9} />
            <Stat label="BB/9" value={stats.bb9} />
            <Stat label="W-L" value={stats.wl} />
          </div>
        ) : (
          // 打者指標
          <div className="grid grid-cols-2 gap-2">
            <Stat label="打数" value={stats.ab} />
            <Stat label="安打" value={stats.h} />
            <Stat label="AVG" value={stats.avg} />
            <Stat label="HR" value={stats.hr} />
            <Stat label="RBI" value={stats.rbi} />
            <Stat label="四球" value={stats.bb} />
            <Stat label="盗塁" value={stats.sb} />
            <Stat label="OBP" value={stats.obp} />
            <Stat label="OPS" value={stats.ops} />
            <Stat label="WAR" value={stats.war} />
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