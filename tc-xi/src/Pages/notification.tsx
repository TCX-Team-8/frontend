import Notification_card from "../Components/notification_Card";
import { IoIosAlert } from "react-icons/io";

export default function Notification() {
  const noti = [
    {
      Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
      type: "Avertissement",
      student: "Imen Benelhadj Djelloul",
    },
    {
      Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
      type: "Avertissement",
      student: "Imen Benelhadj Djelloul",
    },
    {
      Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
      type: "Avertissement",
      student: "Imen Benelhadj Djelloul",
    },
    {
      Tag: <IoIosAlert className="w-14 h-14 text-red-500" />,
      type: "Avertissement",
      student: "Imen Benelhadj Djelloul",
    },
  ];

  return (
    <div className="px-1 max-sm:w-screen max-sm:px-5 py-10 pb-24 flex flex-col gap-5 place-content-center place-items-center">
      <h1 className="text-5xl text-start text-PrimaryBlue">
        Check out your last Notifications
      </h1>
      {noti.map((item) => (
        <Notification_card
          type_tag={item.Tag}
          Type={item.type}
          Student={item.student}
        />
      ))}
    </div>
  );
}
