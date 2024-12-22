import React, { useEffect, useState } from "react";
import Notification_card from "../Components/notification_Card";
import { IoIosAlert } from "react-icons/io";
import Loading from "./loading";

interface Notification {
  tag: JSX.Element; // For the icon or graphical tag
  type: string;
  time: string;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/notifications"); // Replace with your backend API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();

        // Assuming your API response needs mapping to add the `tag`
        const mappedNotifications = data.map((notification: any) => ({
          tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
          type: notification.type,
          time: notification.time,
        }));

        setNotifications(mappedNotifications);
      } catch (err: any) {
        const noti = [
          {
            Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
            type: "Avertissement",
            time: "10-11-2024 12:00",
          },
          {
            Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
            type: "Avertissement",
            time: "10-11-2024 12:00",
          },
          {
            Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
            type: "Avertissement",
            time: "10-11-2024 12:00",
          },
          {
            Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
            type: "Avertissement",
            time: "10-11-2024 12:00",
          },
        ];
        const mappedNotifications = noti.map((notification: any) => ({
          tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
          type: notification.type,
          time: notification.time,
        }));

        setNotifications(mappedNotifications);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">Erreur: {error}</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Aucune notification disponible.</p>
      </div>
    );
  }

  return (
    <div className="px-1 max-sm:w-screen max-sm:px-5 py-10 pb-24 flex flex-col gap-5 place-content-center place-items-center">
      <h1 className="text-5xl text-start text-PrimaryBlue">
        Check out your last Notifications
      </h1>
      {notifications.map((item, index) => (
        <Notification_card
          key={index}
          type_tag={item.tag}
          Type={item.type}
          time={item.time}
        />
      ))}
    </div>
  );
}
