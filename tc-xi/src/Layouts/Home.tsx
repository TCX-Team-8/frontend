import { Outlet, Navigate, Link } from "react-router-dom";
import Sidebar from "../Components/Sider-bar";
import { IoIosHelp, IoMdCall, IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonOutline, IoSwapHorizontalOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function HomeLayout() {
  const isAuthenticated = false;
 

  const [openProfile, setOpenProfile] = useState(false);
  const [openNotification, setOpenNotification] = useState(false); // If you plan to use this
  const [openCall, setOpenCall] = useState(false); // If you plan to use this
  const [usertype,setUserType] = useState('employee');
  const [notifications, setNotifications] = useState([
    {
      id: 5,
      type: "Avertissement",
      timestamp: "12:00"
    },
  ]);
  const [user, setUser] = useState({
    name: "John Doe",
    ssn: "333",
  });
  const NotificationCard = ({ type, timestamp }: { type: string; timestamp: string }) => (
    <div className="text-black w-full gap-2 p-2 flex place-content-start place-items-center border-b border-b-gray-300 h-16">
      <IoSwapHorizontalOutline className="text-PrimaryBlue text-lg" />
      <h1 className="opacity-70">{type}</h1>
      <h1 className="text-black text-xs flex-grow text-end">{timestamp}</h1>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch("/api/user");
        const userData = await userResponse.json();

        // Fetch notifications
        const notificationResponse = await fetch("/api/notifications");
        const notificationData = await notificationResponse.json();

        // Set state
        setUser({
          name: userData.name,
          ssn: userData.ssn,
        });
        setNotifications(notificationData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          <div className="max-h-screen w-full flex-grow flex flex-col overflow-hidden max-md:w-screen max-md:overflow-y-visible max-md:h-auto max-md:place-items-cente max-md:pb-20 r ">
            <div className="hidden sm:flex w-full justify-end h-24 p-4">
              <div className="w-44 h-full bg-[#edf1f4] rounded-3xl p-2 flex flex-row items-center justify-end gap-3">
              <div
                 className="w-12 h-12 rounded-full flex justify-center items-center"
                onClick={() => {setOpenNotification(false);setOpenProfile(false);setOpenCall((prev) => !prev)}}
                >
                  <IoIosHelp className="text-2xl font-light w-12 h-12 text-PrimaryBlue" />
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
                    <h2 className="w-full p-2 border-b border-gray-300">Hi, {user.name} 👋</h2>
                    <Link to={"/"+usertype+"/"+user.ssn+"/profile"} className="w-full p-2 border-b border-gray-300 flex gap-2 items-center">
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
                      {notifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        type={notification.type}
                        timestamp={notification.timestamp}
                      />
                    ))}
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
