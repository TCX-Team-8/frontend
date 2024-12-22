import { ReactNode, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function Notification_card({
  type_tag,
  Type,
  Student,
}: {
  type_tag: ReactNode;
  Type: string;
  Student: string;
}) {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Fetch notification data from an API endpoint
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/notifications');
        const data = await response.json();
        if (data.notifications) {
          setNotifications(data.notifications); // Assuming the API returns a list of notifications
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []); // Only run once on component mount

  return (
    <div className=" text-black w-11/12 rounded-2xl shadow-md p-10 px-2  h-10 bg-slate-100  flex  place-content-center place-items-center backdrop-blur-3xl">
      <div className="w-full flex place-content-start place-items-center">
        {type_tag}
        <p className="text-lg">{Type}</p>
      </div>
      <p>{Student}</p>
      <CgProfile className="w-14 h-14 text-PrimaryBlue" />
      
      {/* Optional: Display fetched notifications */}
      <div className="mt-4">
        <h4 className="font-semibold">Recent Notifications:</h4>
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <div key={index} className="text-sm text-gray-600">{notif}</div>
          ))
        ) : (
          <p>No new notifications</p>
        )}
      </div>
    </div>
  );
}
