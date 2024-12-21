import { IoIosPerson } from "react-icons/io";

interface HolidayCardProps {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  starttime: string;
  endtime: string;
  reason: string;
  treated: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HolidayRequestCard: React.FC<HolidayCardProps> = ({
  firstName,
  lastName,
  email,
  type,
  starttime,
  endtime,
  reason,
  treated,
  setOpen,
}) => {
  return (
    <div
      className={`${
        treated ? "bg-ThirdBlue" : "bg-SecondaryBlue"
      } rounded-3xl w-[250px] h-[350px] flex flex-col p-4 items-start gap-1 text-lg`}
    >
      {/* Employee Header */}
      <div className="w-full flex justify-around items-center">
        <IoIosPerson className={`w-14 h-14 text-xl  ${ !treated ? "text-ThirdBlue" : "text-SecondaryBlue"}`}/>
         <div
          className={`flex flex-col gap-2 text-lg place-content-start place-items-start ${
            treated ? "text-black" : "text-white"
          }`}
        >
          <h2 className="font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="text-xs">{email}</p>
        </div>
      </div>
      {/* Holiday Type and Dates */}
      <div className="w-full flex flex-col items-start mt-4">
      <h2 className={`font-bold ${treated?"text-black":"text-white"}`}>Type</h2>
        <p
          className={`${
            treated ? "text-black" : "text-white"
          } text-xl `}
        >
          {type}
        </p>
        <h2 className={`font-bold ${treated?"text-black":"text-white"}`}>Start/End time</h2>
        <p
          className={`${
            treated ? "text-black" : "text-white"
          } text-sm`}
        >
          {starttime} - {endtime}
        </p>
      </div>
      {/* Reason and Details */}
      <div className="w-full flex flex-col place-content-start place-items-start h-full">
        <h2 className={`font-bold ${treated?"text-black":"text-white"}`}>Reason</h2>
        <p className={`${treated ? "text-black" : "text-white"} text-start`}>
          {reason}
        </p>
        <button
          className={`${treated?"bg-SecondaryBlue text-white":"bg-ThirdBlue"} text-black font-semibold px-4 py-2 rounded-2xl w-full mt-2`}
          onClick={()=>setOpen(true)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default HolidayRequestCard;
