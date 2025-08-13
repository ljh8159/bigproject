import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

const feeLineData = [
  { month: "6월", "방탄소년단": 8.0, "아이유": 6.2, "뉴진스": 4.7, "에스파": 3.3 },
  { month: "7월", "방탄소년단": 8.4, "아이유": 9.1, "뉴진스": 5.2, "에스파": 5.8 },
  { month: "8월", "방탄소년단": 8.2, "아이유": 6.5, "뉴진스": 4.8, "에스파": 3.4 },
];

const contractAvg = [
  { name: "솔로 가수", value: 28.4 },
  { name: "걸그룹", value: 24.6 },
  { name: "배우", value: 16.8 },
  { name: "보이그룹", value: 22.3 },
];

export default function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-medium mb-2">연예인 성과지표 추이</div>
        <ChartContainer
          config={{
            방탄소년단: { label: "방탄소년단", color: "hsl(var(--info))" },
            아이유: { label: "아이유", color: "hsl(var(--success))" },
            뉴진스: { label: "뉴진스", color: "hsl(var(--warning))" },
            에스파: { label: "에스파", color: "hsl(var(--urgent))" },
          }}
          className="h-56 w-full"
        >
          <LineChart data={feeLineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Line type="linear" dataKey="방탄소년단" stroke="hsl(var(--info))" strokeWidth={2.25} />
            <Line type="linear" dataKey="아이유" stroke="hsl(var(--success))" strokeWidth={2.25} />
            <Line type="linear" dataKey="뉴진스" stroke="hsl(var(--primary))" strokeWidth={2.25} />
            <Line type="linear" dataKey="에스파" stroke="hsl(var(--accent-foreground))" strokeWidth={2.25} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">장르별 연평균 계약 건수</div>
        <div className="space-y-3">
          {contractAvg.map((c) => (
            <div key={c.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>{c.name}</span>
                <span className="font-bold">{c.value}건</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${Math.round((c.value/30)*100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
