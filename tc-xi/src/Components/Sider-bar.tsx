import { useState } from "react";
import '../index.css'
import { useParams } from "react-router-dom";
import Navigation from "./side-navigation";
import User from "./User";
import { TiDocumentText } from "react-icons/ti";
import { ImStatsBars } from "react-icons/im";
import { CiCalendarDate } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";

export default function SideBar(){
    useParams()
    const [selected,setselected]=useState("dashboard")
    const Services=[
        {
            title: "Taches",
            icon: "",
        },
        {
            title: "Tableau de Bord",
            icon: "",
        },
        {
            title: "Demande de conge",
            icon: "",
        },
        {
            title: "Information personnel",
            icon: "",
        },
    ]
    return(
        <>
      <nav className="max-md:hidden w-72 h-screen bg-[#0C1B32] flex flex-col gap-5 place-content-between place-items-center">
        <User Fname={"Imen"} Lname={"BHD"}/>
       <ul className="w-full flex flex-col flex-grow text-white place-content-center place-items-center">
        {Services.map((item,index)=>(
            <Navigation key={index} title={item.title} icon={item.icon} params={selected} setparams={setselected} />
        ))}
       </ul>
       <button className={`w-full h-20  flex place-content-start place-items-center px-2 `}>
         Se deconnecter
       </button>
      </nav>

      <div className="w-screen sm:hidden h-20 fixed z-10 bottom-2 p-2 px-5 flex place-content-center place-items-center">
        <ul className="w-full h-full bg-[#0C1B32] rounded-2xl flex place-items-center place-content-around">
          <li
            className="cursor-pointer"
            
          >
            <TiDocumentText className="w-10 h-10 font-bold text-white" />
          </li>
          <li
            className="cursor-pointer"
            
          >
            <ImStatsBars className="w-10 h-10 font-bold text-white" />
          </li>
          <li
            className="cursor-pointer"
            
          >
            <CiCalendarDate className="w-10 h-10 font-bold text-white" />
          </li>
          <li
            className="cursor-pointer"
            
          >
            <CgDetailsMore className="w-10 h-10 font-bold text-white" />
          </li>
        </ul>
      </div>
      </>
    )
}