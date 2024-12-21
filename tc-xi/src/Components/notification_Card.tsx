import { ReactNode } from "react";
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
  return (
    <div className=" text-black w-11/12 rounded-2xl shadow-md p-10 px-2  h-10 bg-slate-100  flex  place-content-center place-items-center backdrop-blur-3xl">
      <div className="w-full flex place-content-start place-items-center">
        {type_tag}
        <p className="text-lg">{Type}</p>
      </div>
      <p>{Student}</p>
      <CgProfile className="w-14 h-14 text-PrimaryBlue" />
    </div>
  );
}
