import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#34d399",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f43f5e",
];

export default function ChartSection({ transactions }) {
  const categoryData = {};

  transactions.forEach((tx) => {
    const key = `${tx.type}:${tx.category || "Other"}`;
    categoryData[key] = (categoryData[key] || 0) + Number(tx.amount);
  });

  const pieData = Object.entries(categoryData).map(([key, value]) => ({
    name: key.replace("income:", "Income - ").replace("expense:", "Expense - "),
    value,
  }));

  if (!pieData.length) return <p style={{ textAlign: "center", color: 'var(--text-muted)' }}>No chart data yet.</p>;

  return (
    <div className="glass-panel" style={{ height: 350, marginTop: 40, display: "flex", flexDirection: "column" }}>
      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Category-wise Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            label={{ fill: 'var(--text-color)', fontSize: 12 }}
            outerRadius={100}
            innerRadius={60}
            stroke="rgba(255,255,255,0.1)"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--card-border)', borderRadius: '8px' }}
             itemStyle={{ color: 'var(--text-color)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
