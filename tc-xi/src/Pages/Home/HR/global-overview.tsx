import React, { useState, useEffect } from "react";
import Absences from "./Components/Gabsences-month";
import Retard_bar from "./Components/Gretard-week";
import Overview from "./Components/General-overview";
import Weekly_Reports from "./Components/Avertissement-W";
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
export default function Global_Dashboard() {
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
  const COLORS = [
    {color:"#0C1B32",name:"A"},
    {color:"#0077b6",name:"B"},
    {color:"#caf0f8",name:"C"},
    {color:"#00b4d8",name:"D"} ];
    //SecondaryBlue: "#0077b6",
    //    ThirdBlue: "#caf0f8",
    //    FourthBlue:'#00b4d8',

  return (
    <section className="w-full pb-24 overflow-x-hidden p-2 max-h-screen overflow-y-scroll flex flex-col place-content-start place-items-center">
      <section className="text-black w-full p-3 flex place-content-center place-items-center gap-5">
        <div className="bg-ThirdBlue flex-grow w-full h-44 shadow-lg  rounded-xl p-3 flex flex-col place-items-start">
                  <h1 className="text-sm font-thin">Les retards</h1>
                  <p className="text-xl text-start font-semibold">
                    {data.retards.totalHours} hours
                  </p>
                </div>
                <div className="bg-SecondaryBlue flex-grow w-full h-44 shadow-lg rounded-xl p-3 flex flex-col place-content-start place-items-start">
                  <h1 className="text-sm font-thin">Les absences</h1>
                  <p className="text-xl text-start font-semibold">
                    {data.absences.weekly} par semaine
                  </p>
                </div>
                <div className="bg-ThirdBlue flex-grow w-full h-44 shadow-lg  rounded-xl p-3 flex flex-col place-content-start place-items-start">
                  <h1 className="text-sm font-thin">Prédiction d'absentéisme</h1>
                  <p className="text-xl text-start font-semibold">{data.prediction}%</p>
                </div>
                <div className="bg-SecondaryBlue flex-grow w-full h-44 overflow-y-scroll shadow-lg  rounded-2xl p-3 flex flex-col place-content-start place-items-start gap-1">
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
        <div className="pt-5 flex-grow w-screen bg-white rounded-2xl flex flex-col gap-4 px-5">
           <div className="h-96">
           <Weekly_Reports/>
            </div>

           <h1 className="text-[#0C1B32] font-semibold border-b-8 border-b-[#B5C5DF] pb-5">
              Les avertissement per week
            </h1>
            <div className="h-96">
              <Retard_bar />
            </div>
            <h1 className="text-[#0C1B32] font-semibold border-b-8 border-b-[#B5C5DF] pb-5">
              Les retardes per week
            </h1>
            <div className="h-96">
            <Absences />
            </div>
            <h1 className="text-[#0C1B32] font-semibold border-b-2 border-b-gray-300 pb-5">
              Number of absences per month
            </h1>
                
          
        </div>
        <div className="max-xl:hidden overflow-x-visible bg-white w-[300px] rounded-3xl h-fit flex flex-col">
         <Overview/>
         <ul className="p-3 flex flex-wrap gap-3 place-content-start place-items-start">
          {COLORS.map((item,index)=>(
            <li key={index} >
              <div style={{backgroundColor: item.color}} className={`w-20 rounded-full flex place-content-center place-items-center py-1 text-white font-semibold`}>{item.name}</div>
            </li>
          ))}
         </ul>
        </div>
      </div>
    </section>
  );
}
