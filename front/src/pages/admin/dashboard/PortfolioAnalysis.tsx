import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from "recharts";

const pieDataGenre = [
  { name: "댄스", value: 60, fill: "hsl(var(--primary))" },
  { name: "힙합/랩", value: 31, fill: "hsl(var(--foreground))" },
  { name: "발라드", value: 9, fill: "hsl(var(--brand-2))" },
];

const pieDataGeneration = [
  { name: "1등급", value: 44, fill: "hsl(var(--primary))" },
  { name: "2등급", value: 38, fill: "hsl(var(--foreground))" },
  { name: "3등급", value: 18, fill: "hsl(var(--brand-2))" },
];

const feeLineData = [
  { month: "6월", 솔로: 3.2, 걸그룹: 4.1, 배우: 2.1, 보이그룹: 3.6 },
  { month: "7월", 솔로: 3.6, 걸그룹: 4.4, 배우: 2.4, 보이그룹: 3.2 },
  { month: "8월", 솔로: 3.9, 걸그룹: 4.9, 배우: 2.8, 보이그룹: 3.8 },
];

const contractAvg = [
  { name: "솔로 가수", value: 28.4 },
  { name: "걸그룹", value: 24.6 },
  { name: "배우", value: 16.8 },
  { name: "보이그룹", value: 22.3 },
];

const RADIAN = Math.PI / 180;
const renderPieLabel = ({ cx, cy, midAngle, outerRadius, percent, name }: any) => {
  const radius = outerRadius + 12;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="hsl(var(--foreground))" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-semibold">
      {`${name} ${Math.round((percent || 0) * 100)}%`}
    </text>
  );
};

export default function PortfolioAnalysis() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="text-sm font-medium mb-0">장르별 연예인 분포</div>
          <ChartContainer config={{}} className="aspect-square">
            <PieChart>
              <Pie data={pieDataGenre} dataKey="value" nameKey="name" outerRadius={80} labelLine={false} label={renderPieLabel}>
                {pieDataGenre.map((entry, i) => (
                  <Cell key={`cell-g-${i}`} fill={entry.fill} stroke="hsl(var(--background))" strokeWidth={1} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
              <ChartLegend content={<ChartLegendContent hideIndicator />} />
            </PieChart>
          </ChartContainer>
        </div>
        <div>
          <div className="text-sm font-medium mb-0">연예인 등급표</div>
          <ChartContainer config={{}} className="aspect-square">
            <PieChart>
              <Pie data={pieDataGeneration} dataKey="value" nameKey="name" outerRadius={80} labelLine={false} label={renderPieLabel}>
                {pieDataGeneration.map((entry, i) => (
                  <Cell key={`cell-gen-${i}`} fill={entry.fill} stroke="hsl(var(--background))" strokeWidth={1} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
              <ChartLegend content={<ChartLegendContent hideIndicator />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>

        <div>
          <div className="text-sm font-medium mb-2">연예인 팀 타입 및 분포</div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-md border bg-muted/40 p-3 text-center">
            <div className="text-xs text-muted-foreground">솔로 아티스트</div>
            <div className="text-lg font-bold">286명</div>
            <div className="text-xs text-muted-foreground">전체의 59.8%</div>
          </div>
          <div className="rounded-md border bg-muted/40 p-3 text-center">
            <div className="text-xs text-muted-foreground">그룹 아티스트</div>
            <div className="text-lg font-bold">43팀</div>
            <div className="text-xs text-muted-foreground">전체의 31.2%</div>
          </div>
          <div className="rounded-md border bg-muted/40 p-3 text-center">
            <div className="text-xs text-muted-foreground">기타 엔터테이너</div>
            <div className="text-lg font-bold">42명</div>
            <div className="text-xs text-muted-foreground">전체의 9.0%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
