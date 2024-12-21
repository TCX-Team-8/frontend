import { useState } from "react";
import '../index.css'
import { TiDocumentText } from "react-icons/ti";
import { ImStatsBars } from "react-icons/im";
import { CiCalendarDate } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import { IoDocumentText,  IoStatsChart } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdFormatAlignLeft, MdOutlineNotifications, MdOutlinePrivacyTip } from "react-icons/md";

export default function SideBar(){
  const path = window.location.pathname.toLowerCase();
  //const special_path = ["/rh"];
  //const isSpecial = special_path.includes(path);
    const [selected,setselected]=useState("Tableau de Bord")
    const Services=[
      {
        title: "Notification",
        icon:  <MdOutlineNotifications className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />,
    },
        {
            title: "Taches",
            icon:  <IoDocumentText className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />,
        },
        {
            title: "Tableau de Bord",
            icon:  <IoStatsChart className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />,
        },
        {
            title: "Demande de conge",
            icon:  <MdFormatAlignLeft className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />,
        },
        {
            title: "Information personnel",
            icon:  <MdOutlinePrivacyTip className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />,
        },
    ]
    return(
        <>
      <div className="max-md:hidden  h-screen w-[270px] max-lg:w-36 bg-PrimaryBlue flex flex-col gap-8  max-md:place-items-center place-items-start pt-4">
        <div className="flex flex-col h-full w-full justify-between">
          <ul className="w-full flex flex-col gap-5 py-4">
           {
            Services.map((item,index)=>(
              <li
              key={index}
              onClick={()=>setselected(item.title)}
              className={`cursor-pointer md:px-2 flex py-2 w-full transition-all ${
                selected.toLocaleLowerCase()==item.title.toLocaleLowerCase() ? "border-r-4 border-r-ThirdBlue" : "opacity-50"
              } gap-5 place-content-start max-xl:place-content-center place-items-center`}
            >
             {item.icon}
              <p className="text-base max-xl:hidden">{item.title}</p>
            </li>
            ))
           }
          </ul>
          <div className="cursor-pointer md:px-2 flex py-2 w-full opacity-50 gap-5 place-content-start max-xl:place-content-center place-items-center mb-10">
            <FiLogOut className="w-8 h-8 xl:w-6 font-bold text-white" />
            <p className="text-base max-xl:hidden">Log out</p>
          </div>
        </div>
      </div>

      <div className="max-md:w-screen md:hidden h-20 fixed z-10 bottom-2 p-2 px-5 flex place-content-center place-items-center">
        <ul className="w-full h-full bg-PrimaryBlue rounded-2xl flex place-items-center place-content-around">
         {Services.map((item,index)=>(
          <div key={index}>
          {item.icon}
          </div>
         ))}
        </ul>
      </div>
      </>
    )
}