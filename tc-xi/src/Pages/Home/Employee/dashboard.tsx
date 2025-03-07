import React, { useState, useEffect } from "react";
import Absences from "./Components/absences-month";
import Retard_bar from "./Components/retard-week";
import { IoIosWarning } from "react-icons/io";
import Overview from "./Components/General-overview";
import MyCalendar from "./Components/MyCalendar";

interface Data {
  retards: {
    totalHours: number;

  };
  absences: {
    weekly: number;
  };
  prediction: number;
  warnings: string[];
}

export default function Dashboard() {
  const [data, setData] = useState<Data>({
    retards: {
      totalHours: 15,
    },
    absences: {
      weekly: 10,
    },
    prediction: 80,
    warnings: [
      "vous êtes absent +3 fois",
      "vous êtes en retard régulièrement",
      "contactez votre responsable",
    ],
  });

  useEffect(() => {
    // Function to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard-data"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedData: Data = await response.json();

        // Update state with fetched data
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Optionally handle the error state here
      }
    };

    fetchData();
  }, []);

  const COLORS = [
    { color: "#0C1B32", name: "A" },
    { color: "#0077b6", name: "B" },
    { color: "#caf0f8", name: "C" },
    { color: "#00b4d8", name: "D" },
  ];

  return (
    <section className="w-full overflow-x-hidden p-2 max-h-screen overflow-y-scroll flex flex-col place-content-start place-items-center">
      <section className="text-black w-full p-3 flex place-content-center place-items-center gap-5">
         <div className="bg-ThirdBlue flex-grow w-full h-32 shadow-lg rounded-xl p-3 flex flex-col place-items-start">
                  <h1 className="text-sm font-thin">Les retards</h1>
                  <p className="text-xl text-start font-semibold">{data.retards.totalHours} hours</p>
                </div>
                <div className="bg-SecondaryBlue text-white flex-grow w-full h-32 shadow-lg rounded-xl p-3 flex flex-col place-content-start place-items-start">
                  <h1 className="text-sm font-thin">Les absences</h1>
                  <p className="text-xl text-start font-semibold">{data.absences.weekly} par semaine</p>
                </div>
                <div className="bg-ThirdBlue flex-grow w-full h-32 shadow-lg rounded-xl p-3 flex flex-col place-content-start place-items-start">
                  <h1 className="text-sm font-thin">Prédiction d'absentéisme</h1>
                  <p className="text-xl text-start font-semibold">{data.prediction}%</p>
                </div>
                <div className="bg-SecondaryBlue max-xl:hidden text-white flex-grow w-full h-32 overflow-y-scroll shadow-lg rounded-2xl p-3 flex flex-col place-content-start place-items-start gap-1">
                  {data.warnings.map((warning, index) => (
                    <div
                      key={index}
                      className="w-full h-20 px-2 border-b border-b-PrimaryBlue flex place-content-start place-items-center gap-2"
                    >
                      <IoIosWarning className="w-5 h-5" />
                      <p className="text-start text-sm">{warning}</p>
                    </div>
                  ))}
                </div>
      </section>
      <div className="px-3 w-full flex gap-5 max-md:pb-24">
        <div className="pt-5 flex-grow w-screen bg-white rounded-2xl flex flex-col px-5">
          <div className="h-96">
            <Retard_bar />
          </div>
          <h1 className="text-[#0C1B32] font-semibold border-b-8 border-b-[#B5C5DF] pb-5">
            Les retard per week
          </h1>
          <div className="w-full flex pt-4 max-lg:flex-col-reverse max-md:place-items-center max-lg:place-items-center">
            <MyCalendar />
            <div className="w-full">
              <Absences />
              <h1 className="text-[#0C1B32] font-semibold border-b-2 border-b-gray-300 pb-5">
                Number of absences per month
              </h1>
            </div>
          </div>
        </div>
        <div className="max-xl:hidden overflow-x-visible bg-white w-[300px] rounded-3xl h-screen">
          <Overview />
          <ul>
            {COLORS.map((item, index) => (
              <li key={index} style={{ backgroundColor: item.color }}>
                <div
                  className={`w-full rounded-full flex place-content-center place-items-center py-1 text-white font-semibold`}
                >
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
