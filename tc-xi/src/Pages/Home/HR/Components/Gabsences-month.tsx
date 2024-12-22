import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Absences_perW {
  week: number;
  abs: number; // Absences for each week
}

export default function Absences() {
  const [data, setData] = useState<Absences_perW[]>([]); // Initialize the state to hold absences data

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/absences"); // Replace with your API URL
        const result = await response.json();

        // Assuming the API returns an array of weeks with absences
        setData(result); // Update the data state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error or use fallback data if necessary
        setData([
          { week: 1, abs: 3 },
          { week: 2, abs: 5 },
          { week: 3, abs: 2 },
          { week: 4, abs: 4 },
        ]); // Example fallback data
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 9,
          right: 30,
          left: 0,
          bottom: 2,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" label={{ value: "Week", position: "insideBottom", dy: 4 }} />
        <YAxis label={{ value: "Absences", angle: -90, position: "insideLeft", dx: -10 }} />
        <Tooltip />
        <Area type="monotone" dataKey="abs" stroke="#0C1B32" fill="#0C1B32" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
