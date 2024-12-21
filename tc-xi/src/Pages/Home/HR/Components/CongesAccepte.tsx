import React from "react";
import { IoIosClose, IoIosPerson } from "react-icons/io";

interface Employee {
  SSN: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  type: string;
  starttime: string;
  endtime: string;
}

interface HolidayRequestProps {
  employee: Employee;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reason: string;
}

export default function HolidayRequest({
  employee,
  setOpen,
  reason,
}: HolidayRequestProps) {
  return (
    <div className="w-fit flex flex-col place-content-center place-items-center bg-white rounded-md shadow-md">
      <div className="w-full max-w-[1000px] rounded-xl flex flex-col place-content-center place-items-center p-4">
        {/* Title */}
        <h1 className="text-5xl text-PrimaryBlue flex gap-2 place-content-center place-items-center">
          Holiday Request
        </h1>
        <IoIosClose
          className="absolute top-4 right-4 text-4xl cursor-pointer"
          onClick={() => setOpen(false)}
        />
        {/* Employee Details */}
        <div className="h-fit w-full rounded-3xl flex max-sm:flex-col max-sm:text-center place-content-start gap-5 p-5 place-items-center">
          <IoIosPerson className="text-4xl text-PrimaryBlue" />
          <div>
            <h1 className="text-2xl text-start text-PrimaryBlue">
              {employee.firstName} {employee.lastName}
            </h1>
            <div className="flex flex-col place-content-start place-items-start text-black text-sm text-gray-600">
              <h1>Email: {employee.email}</h1>
              <h1>Type: {employee.type}</h1>
            </div>
          </div>
        </div>
        {/* Holiday Details */}
        <div className="flex flex-col place-content-start place-items-start gap-5 w-full px-5">
          <h1 className="text-lg text-black">
            <span className="font-bold pr-2 text-PrimaryBlue">Holiday Reason:</span>
            {reason}
          </h1>
          <h1 className="text-lg text-black">
            <span className="font-bold pr-2 text-PrimaryBlue">Holiday Period:</span>
            {employee.starttime} to {employee.endtime}
          </h1>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-5 self-end pt-4">
          <button className="w-32 p-2 text-nowrap text-white rounded-2xl bg-SecondaryBlue">
            Reject
          </button>
          <button className="w-32 p-2 text-nowrap text-white rounded-2xl bg-PrimaryBlue">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
