import { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0C1B32", "#0077b6", "#caf0f8", "#00b4d8"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Overview() {
  const [data, setData] = useState([
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data
        const fetchedData = [
          { name: "Group A", value: 500 },
          { name: "Group B", value: 350 },
          { name: "Group C", value: 450 },
          { name: "Group D", value: 150 },
        ];
        // Set the fetched data into state
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, possibly set default data
      }
    };

    fetchData();
  }, []); // Empty array means this will run once when the component mounts

  return (
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={150}
        cy={150}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
