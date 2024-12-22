import { Outlet, Navigate, Link } from "react-router-dom";
import Sidebar from "../Components/Sider-bar";
import { IoMdCall, IoMdNotificationsOutline, IoMdPhonePortrait } from "react-icons/io";
import { IoPersonOutline, IoSwapHorizontalOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function HomeLayout() {
  const isAuthenticated = false;
 

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotification, setOpenNotification] = useState(false); // If you plan to use this
  const [openCall, setOpenCall] = useState(false); // If you plan to use this
  const [usertype,setUserType] = useState('employee');
  const NotficationCard=()=>{
    return(
      <div className="text-black w-full gap-2 p-2 flex place-content-start place-items-center border-b border-b-gray-300 h-16">
                        <IoSwapHorizontalOutline className="text-PrimaryBlue text-lg" />
                        <h1 className="opacity-70 ">Swap Request</h1>
                        <h1 className="text-black text-xs flex-grow text-end">01/15 <br/> 12:03</h1>
      </div>
    )
  }
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <main
          className={`flex w-screen h-screen place-content-between'
          // { isSpecialPath ? "place-content-center" : "place-content-end" }`
        }
        >
          <Sidebar />
          <div className="max-h-screen w-full flex-grow flex flex-col overflow-hidden max-md:w-screen max-md:overflow-y-visible max-md:h-auto max-md:place-items-center ">
            <div className="hidden sm:flex w-full justify-end h-24 p-4">
              <div className="w-44 h-full bg-[#edf1f4] rounded-3xl p-2 flex flex-row items-center justify-end gap-3">
              <div
                 className="w-12 h-12 rounded-full flex justify-center items-center"
                onClick={() => {setOpenNotification(false);setOpenProfile(false);setOpenCall((prev) => !prev)}}
                >
                  <IoMdCall className="text-2xl text-PrimaryBlue" />
                </div>
                <div
                 className="w-12 h-12 rounded-full flex justify-center items-center"
                onClick={() => {setOpenProfile(false);setOpenCall(false);setOpenNotification((prev) => !prev)}}
                >
                  <IoMdNotificationsOutline className="text-2xl text-PrimaryBlue" />
                </div>
                <div
                  className="w-12 h-12 rounded-full flex justify-center items-center bg-ThirdBlue shadow-xl cursor-pointer"
                  onClick={() => {setOpenNotification(false);setOpenCall(false);setOpenProfile((prev) => !prev)}}
                >
                  <IoPersonOutline className="text-2xl text-PrimaryBlue" />
                </div>
                {openCall && (
                  <div className="text-black w-64 absolute top-24 right-5 z-50 bg-[#edf1f4] rounded-xl h-fit flex  place-content-between place-items-center p-5">
                   <p className="text-sm font-extralight">Call ** *** *** **</p>
                   <IoMdCall className="w-5 h-5"/>
                  </div>
                )}
                {openProfile && (
                  <div  className="text-black w-64 absolute top-24 right-5 z-50 bg-[#edf1f4] rounded-xl h-fit flex flex-col">
                    <h2 className="w-full p-2 border-b border-gray-300">Hi, Tarek 👋</h2>
                    <Link to={"/profile/ssn6"} className="w-full p-2 border-b border-gray-300 flex gap-2 items-center">
                      <IoPersonOutline  />
                      Profile
                    </Link>
                    <a href="/" className="w-full p-2 flex gap-2 items-center">
                      <FiLogOut />
                      Log out
                    </a>
                  </div>
                )}
                {openNotification&&(
                    <div className="w-64 absolute top-24 right-12 z-50 bg-[#edf1f4] rounded-xl h-fit flex flex-col">
                      <NotficationCard />
                      <NotficationCard />
                  </div>
                  )}
              </div>
            </div>
            <div className="w-full flex place-content-center place-items-start h-full overflow-y-scroll">

            <Outlet />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
