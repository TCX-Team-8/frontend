// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    fetchData()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        // Handle the error by setting the data with the default dataset
        setData([
          { day: "Sunday", reports: 4000 },
          { day: "Monday", reports: 3000 },
          { day: "Tuesday", reports: 2000 },
          { day: "Wednesday", reports: 2780 },
          { day: "Thursday", reports: 1890 },
        ]);
      });
  }, []);

  // Simulated fetch function
  const fetchData = async () => {
    // Simulating a failed API request
    throw new Error("Failed to fetch data");
  };

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart data={data} margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="reports"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        >
          <LabelList position="top" offset={10} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
