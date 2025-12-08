import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    // CartesianGrid,
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
            {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fontSize: 11, fill: "currentColor" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148, 163, 184, 0.15)" }} // 막대 hover 영역 살짝 강조 (선택)
              contentStyle={{
                fontSize: 11,
                backgroundColor: "#F9FAFB", // 거의 흰색
                borderColor: "#E5E7EB",     // 연한 회색 테두리
                color: "#0F172A",           // 진한 글자색
              }}
              labelStyle={{
                color: "#6B7280",           // 라벨(카테고리명) 색
              }}
              itemStyle={{
                color: "#0F172A",           // 값 텍스트 색
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
  