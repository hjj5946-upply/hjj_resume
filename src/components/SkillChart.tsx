import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  const data = [
    { name: "Backend", value: 85 },
    { name: "Frontend", value: 70 },
    { name: "Mobile", value: 60 },
    { name: "DevOps", value: 50 },
  ];
  
  export function SkillChart() {
    return (
      <div className="h-56 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-600 dark:bg-[#383a3d]">
        <p className="mb-2 text-[11px] font-semibold text-slate-500 dark:text-slate-300">
          Tech Focus (비중)
        </p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fontSize: 11, fill: "currentColor" }}
            />
            <Tooltip
              contentStyle={{
                fontSize: 11,
              }}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              // Tailwind의 currentColor를 써서 라이트/다크에 자연스럽게 맞춤
              fill="currentColor"
              className="text-slate-400 dark:text-slate-200"
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  