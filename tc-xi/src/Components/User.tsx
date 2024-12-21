import { IoIosPerson } from "react-icons/io";

export default function User(
    {Fname,Lname}:
{
    Fname:string;
    Lname:string;
}){
    return(
        <div className="p-4 w-full flex gap-4 place-content-start place-items-center">
            <div className="w-10 h-10  rounded-full"><IoIosPerson className="w-full h-full"/></div>
            <div>
                <p className="text-md">{Fname}</p>
                <p className="text-md">{Lname}</p>
            </div>
        </div>
    )
}