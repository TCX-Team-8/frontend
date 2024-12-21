import React, { useState, useEffect } from "react";
import Absences from "./Components/absences-month";
import Retard_bar from "./Components/retard-week";
import { IoIosWarning } from "react-icons/io";

interface Data {
  retards: {
    totalHours: number;
    max: number;
    min: number;
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
      max: 50,
      min: 10,
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
    // Simulating fetching data from an API
    const fetchData = async () => {
      // Example of fetched data
      const fetchedData = {
        retards: {
          totalHours: 15,
          max: 50,
          min: 10,
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
      };

      // Update state with fetched data
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <section className="w-[95vw] max-h-screen overflow-y-scroll flex flex-col place-content-start place-items-center">
      <section className="text-black w-full p-3 flex place-content-center place-items-center gap-5">
        <div className="flex-grow w-full h-44 shadow-lg bg-white rounded-xl p-3 flex flex-col place-items-start">
          <h1 className="text-sm font-thin">Les retards</h1>
          <p className="text-lg font-semibold">
            {data.retards.totalHours} hours
          </p>
          <p className="text-lg">
            Max retard:{" "}
            <span className="font-semibold text-lg">
              {data.retards.max} Minutes
            </span>
          </p>
          <p className="text-lg">
            Min retard:{" "}
            <span className="font-semibold text-lg">
              {data.retards.min} Minutes
            </span>
          </p>
        </div>
        <div className="flex-grow w-full h-44 shadow-lg bg-white rounded-xl p-3 flex flex-col place-content-start place-items-start">
          <h1 className="text-sm font-thin">Les absences</h1>
          <p className="text-lg font-semibold">
            {data.absences.weekly} par semaine
          </p>
        </div>
        <div className="flex-grow w-full h-44 shadow-lg bg-white rounded-xl p-3 flex flex-col place-content-start place-items-start">
          <h1 className="text-sm font-thin">Prédiction d'absentéisme</h1>
          <p className="text-lg font-semibold">{data.prediction}%</p>
        </div>
        <div className="flex-grow w-full h-44 overflow-y-scroll shadow-lg bg-white rounded-2xl p-3 flex flex-col place-content-start place-items-start gap-1">
          {data.warnings.map((warning, index) => (
            <div
              key={index}
              className="w-full h-20 px-2 rounded-lg  bg-gray-300 flex place-content-start place-items-center gap-2"
            >
              <IoIosWarning className="w-5 h-5" />
              <p className="text-start">{warning}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="px-3 w-full flex gap-5">
        <div className="flex-grow w-auto bg-white rounded-2xl flex flex-col px-5">
          <Retard_bar />
          <div >
            <h1 className="text-[#0C1B32] font-semibold border-b-2 border-b-gray-300 pb-5">
              Number of absences per week
            </h1>
            <Absences />
          </div>
        </div>
        <div className="max-lg:hidden bg-white w-[300px] rounded-3xl h-[80vh]">
<h1>55</h1>
        </div>
      </div>
    </section>
  );
}
