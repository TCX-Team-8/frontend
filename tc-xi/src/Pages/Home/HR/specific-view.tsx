import React, { useState, useEffect } from "react";
import Absences from "./Components/Sabsences-month";
import Retard_bar from "./Components/Sretard-week";
import { IoIosWarning } from "react-icons/io";
import Overview from "./Components/General-overview";
import MyCalendar from "./Components/MyCalendar";

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

export default function Specific_Dashboard() {
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

  const handleWarningClick = async () => {
    try {
      // Example action: Sending an alert to the user
      const response = await fetch("https://api.example.com/send-warning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Attention! Vous avez des avertissements à consulter.",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send warning");
      }

      alert("Un avertissement a été envoyé avec succès !");
    } catch (error) {
      console.error("Error sending warning: ", error);
      alert("Échec de l'envoi de l'avertissement.");
    }
  };

  useEffect(() => {
    // Fetching real data from an API
    const fetchData = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch("https://api.example.com/dashboard-data");
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the JSON response
        const fetchedData = await response.json();

        // Update state with the fetched data
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
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
    <section className="w-full pb-24 overflow-x-hidden p-2 max-h-screen overflow-y-scroll flex flex-col place-content-start place-items-center">
      <IoIosWarning onClick={handleWarningClick} className="p-2 text-red-500 w-16 h-16 bg-red-100 rounded-full shadow-2xl fixed bottom-5 right-5 transition-all hover:scale-105 max-md:bottom-24" />
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
      <div className="px-3 w-full flex gap-5">
        <div className="pt-5 flex-grow w-screen bg-white rounded-2xl flex flex-col px-5">
          <div className="h-96">
            <Retard_bar />
          </div>
          <h1 className="text-[#0C1B32] font-semibold border-b-8 border-b-[#B5C5DF] pb-5">
            Les retard per week
          </h1>
          <div className="w-full flex pt-4 max-md:flex-col-reverse max-md:place-items-center">
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
