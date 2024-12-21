import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Absences_perW {
  week: number;
  abs: number; // Change abs to a single number for each week
}

export default function Absences() {
  const [data, setData] = useState<Absences_perW[]>([]); // Changed type to array of Absences_perW

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      const fetchedData = Array.from({ length: 4 }, (_, index) => ({
        week: index + 1,
        abs: Math.floor(Math.random() * 10) + 1, // Random absences for demo
      }));
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <AreaChart
    className=""
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" label={{ value: "Week", position: "insideBottom", dy: 10 }} />
      <YAxis label={{ value: "Absences", angle: -90, position: "insideLeft", dx: -10 }} />
      <Tooltip />
      <Area type="monotone" dataKey="abs" stroke="#0C1B32" fill="#0C1B32" />
    </AreaChart>
  );
}
