import { useState, useEffect } from "react";
import "../index.css";
import { IoDocumentText, IoPersonAdd, IoStatsChart } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import {
  MdFormatAlignLeft,
  MdOutlineNotifications,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbFaceId } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const path = window.location.pathname.toLowerCase();

  const [userType, setType] = useState("hr"); // Default empty
  const [userSSn, setssn] = useState("123"); // Default empty

  const [selected, setselected] = useState("Tableau de Bord");

  // Services based on userType
  const Services_emp = [
    {
      title: "Notification",
      path: "notification",
      icon: (
        <MdOutlineNotifications className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Taches",
      path: "taches",
      icon: (
        <IoDocumentText className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Tableau de Bord",
      path: "",
      icon: (
        <IoStatsChart className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Information personnel",
      path: "change-info",
      icon: (
        <MdOutlinePrivacyTip className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
  ];

  const Services_rh = [
    {
      title: "Notification",
      path: "notification",
      icon: (
        <MdOutlineNotifications className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Liste d'employees",
      path: "employee",
      icon: (
        <FaPeopleGroup className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Check In/Out",
      path: "Check-in-out",
      icon: (
        <TbFaceId className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Taches",
      path: "taches",
      icon: (
        <IoDocumentText className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Tableau de Bord",
      path: "",
      icon: (
        <IoStatsChart className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Demande de conge",
      path: "treat-conges",
      icon: (
        <MdFormatAlignLeft className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Information personnel",
      path: "change-info",
      icon: (
        <MdOutlinePrivacyTip className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    }
  ];

  const Services_admin = [
    {
      title: "Check In/Out",
      path: "",
      icon: (
        <TbFaceId className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
    {
      title: "Add employee",
      path: "create-account",
      icon: (
        <IoPersonAdd className="w-8 h-8 xl:w-6 max-lg:w-20 font-bold text-white" />
      ),
    },
  ];

  const navigate = useNavigate();

  // Fetch userType and userSSn from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user-data', {
          method: 'GET', // Or 'POST' depending on your API
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setType(data.departement_id); // Assuming your response has a `departement_id`
          setssn(data.nss);   // Assuming your response has a `nss`
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []); // This will run once when the component mounts

  return (
    <>
      <div className="max-md:hidden  h-full w-[270px] max-lg:w-36 bg-PrimaryBlue flex flex-col gap-8  max-md:place-items-center place-items-start pt-4">
        <div className="w-10 h-10 bg-ThirdBlue rounded-full ml-5">logoooo</div>
        <div className="flex flex-col h-full w-full items-start justify-between">
          <ul className="w-full flex flex-col gap-5 py-4">
            {userType.toLocaleLowerCase() === "hr" &&
              Services_rh.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {setselected(item.title); navigate(`/${userType}/${userSSn}/${item.path}`)}}
                  className={`cursor-pointer md:px-2 flex py-2 w-full transition-all ${selected.toLocaleLowerCase() === item.title.toLocaleLowerCase() ? "border-r-4 border-r-ThirdBlue" : "opacity-50"} gap-5 place-content-start max-lg:place-content-center place-items-center`}>
                  {item.icon}
                  <p className="text-base max-lg:hidden">{item.title}</p>
                </li>
              ))}
            {userType.toLocaleLowerCase() === "employee" &&
              Services_emp.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {setselected(item.title); navigate(`/${userType}/${userSSn}/${item.path}`)}}
                  className={`cursor-pointer md:px-2 flex py-2 w-full transition-all ${selected.toLocaleLowerCase() === item.title.toLocaleLowerCase() ? "border-r-4 border-r-ThirdBlue" : "opacity-50"} gap-5 place-content-start max-lg:place-content-center place-items-center`}>
                  {item.icon}
                  <p className="text-base max-lg:hidden">{item.title}</p>
                </li>
              ))}
            {userType.toLocaleLowerCase() === "admin" &&
              Services_admin.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {setselected(item.title); navigate(`/${userType}/${userSSn}/${item.path}`)}}
                  className={`cursor-pointer md:px-2 flex py-2 w-full transition-all ${selected.toLocaleLowerCase() === item.title.toLocaleLowerCase() ? "border-r-4 border-r-ThirdBlue" : "opacity-50"} gap-5 place-content-start max-lg:place-content-center place-items-center`}>
                  {item.icon}
                  <p className="text-base max-lg:hidden">{item.title}</p>
                </li>
              ))}
          </ul>
          <div className="cursor-pointer md:px-2 flex py-2 w-full opacity-50 gap-5 place-content-start max-lg:place-content-center place-items-center mb-10">
            <FiLogOut className="w-8 h-8 xl:w-6 font-bold text-white" />
            <p className="text-base max-lg:hidden">Log out</p>
          </div>
        </div>
      </div>

      <div className="max-md:w-screen md:hidden h-20 fixed z-10 bottom-2 p-2 px-5 flex place-content-center place-items-center">
        <ul className="w-full h-full bg-PrimaryBlue rounded-2xl flex place-items-center place-content-around">
          {userType.toLocaleLowerCase() === "hr" &&
            Services_rh.map((item, index) => (
              <div key={index} onClick={() => {setselected(item.title); navigate(`/${userType}/${userSSn}/${item.path}`)}}>{item.icon}</div>
            ))}
          {userType.toLocaleLowerCase() === "employee" &&
            Services_emp.map((item, index) => (
              <div key={index} onClick={() => {setselected(item.title); navigate(`/${userType}/${userSSn}/${item.path}`)}}>{item.icon}</div>
            ))}
          {userType.toLocaleLowerCase() === "admin" &&
            Services_admin.map((item, index) => (
              <div key={index} onClick={() => {setselected(item.title); navigate(`/${userType}/${userSSn}/${item.path}`)}}>{item.icon}</div>
            ))}
        </ul>
      </div>
    </>
  );
}
