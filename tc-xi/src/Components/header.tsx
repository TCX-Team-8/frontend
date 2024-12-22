import React, { useRef, useState, useEffect } from "react";
import { IoIosBasketball, IoMdNotificationsOutline } from "react-icons/io";
import { IoClose, IoHelpCircleOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";

const Header: React.FC = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
   
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/notifications');
        const data = await response.json();
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const lastThreeNotifications = notifications.slice(-3);

  return (
    <div className="">
      <div className="bg-[#0C1B32] p-5 flex gap-5 place-items-center relative">
        <IoMdNotificationsOutline
          onClick={toggleDropdown}
          className="w-10 h-10 ml-auto text-white cursor-pointer"
        />

        {showDropdown && (
          <div className="absolute top-14 right-10 bg-white text-black shadow-md rounded-lg w-64 p-3 z-10">
            <h4 className="text-lg font-semibold mb-2">Notifications</h4>
            {lastThreeNotifications.length > 0 ? (
              lastThreeNotifications.map((notif, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 py-2 last:border-none"
                >
                  {notif}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No new notifications</p>
            )}
          </div>
        )}

        <IoHelpCircleOutline
          onClick={openModal}
          className="w-12 h-12 text-white cursor-pointer"
        />

        <dialog
          ref={modalRef}
          className="p-10 border-none shadow-none outline-none bg-white rounded-lg"
        >
          <IoClose
            onClick={closeModal}
            className="ml-auto w-8 h-8 cursor-pointer"
          />
          <p>Si vous rencontrez un problème, vous pouvez nous contacter via :</p>
          <br />
          <p className="ml-4 flex flex-row place-items-center gap-2">
            <FaCircle className="w-2 h-2 " /> Notre numéro de téléphone :
            <span className="font-semibold">0512345678</span>
          </p>
          <p className="ml-4 flex flex-row place-items-center gap-2">
            <FaCircle className="w-2 h-2" /> Notre adresse email :
            <span className="font-semibold">equipe_08@tc.dz</span>
          </p>
        </dialog>
      </div>
    </div>
  );
};

export default Header;
