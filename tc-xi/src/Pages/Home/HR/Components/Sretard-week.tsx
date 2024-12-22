import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define the Retard class
class Retard {
  Day: string;
  minute: number;

  constructor(Day: string, minute: number) {
    this.Day = Day;
    this.minute = minute;
  }
}

export default function Retard_bar() {
  const [data, setData] = useState<Retard[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch("http://");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const fetchedData = await response.json();

        // Assuming the fetched data is an array of { day: string, minute: number }
        const formattedData = fetchedData.map(
          (item: { day: string; minute: number }) =>
            new Retard(item.day, item.minute)
        );
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);

        // Initialize with default values in case of error
        const fallbackData = [
          new Retard("Dimanche", 40),
          new Retard("Lundi", 30),
          new Retard("Mardi", 20),
          new Retard("Mercredi", 20),
          new Retard("Jeudi", 10),
        ];
        setData(fallbackData);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        className="pt-5"
        width={845}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={50}
      >
        <XAxis dataKey="Day" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="7 3" />
        <Bar
          dataKey="minute"
          fill="#0C1B32"
          background={{ fill: "transparent" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
