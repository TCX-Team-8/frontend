import React, { useEffect, useState } from "react";
import { GoPersonFill } from "react-icons/go";
import { FaBuilding, FaPerson } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import Loading from "./loading";

interface Employee {
  SSN: string;
  prenom: string;
  nom: string;
  type: string;
  email: string;
  adresse: string;
}

export default function Profile() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/employee/12345"); // Replace with your backend API URL
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data: Employee = await response.json();
        setEmployee(data);
      } catch (err: any) {
        setEmployee({    
            SSN:"38469301",
            prenom:"Benelhadj Djelloul",
            nom:"Imen",
            type:"Employee",
            email:"bhdlina052@gmail.com",
            adresse:"Alger",  
        
        })
       // setError(err.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
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

  if (!employee) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Aucun employé trouvé.</p>
      </div>
    );
  }

  return (
    <>
      <div className="sm:hidden min-h-screen w-screen p-5 flex flex-col place-content-start place-items-center gap-5">
        <div className="bg-ThirdBlue h-fit w-full rounded-3xl flex place-content-start gap-5 p-10 place-items-center shadow-2xl">
          <GoPersonFill className="w-20 h-20 text-PrimaryBlue" />
          <div>
            <h1 className="text-2xl text-start text-PrimaryBlue">{employee.nom}</h1>
            <h1 className="text-PrimaryBlue">{employee.prenom}</h1>
          </div>
        </div>
        <div className="w-full flex flex-col place-content-start place-items-start h-fit gap-5 p-10 py-10 bg-ThirdBlue shadow-2xl rounded-3xl text-PrimaryBlue">
          <h1 className="flex text-PrimaryBlue text-nowrap max-lg:text-xl max-md:text-base text-2xl gap-3 border-r-2 border-r-white pr-5 h-full place-content-center place-items-center">
            <span>
              <FaPerson />
            </span>
            {employee.type}
          </h1>
          <h1 className="flex text-PrimaryBlue text-nowrap max-lg:text-xl max-md:text-base text-2xl gap-3 border-r-2 border-r-white pr-5 h-full place-content-center place-items-center">
            <span>
              <FaBuilding />
            </span>
            {employee.email}
          </h1>
          <h1 className="flex text-PrimaryBlue text-nowrap max-lg:text-xl max-md:text-base text-2xl gap-3 h-full place-content-center place-items-center">
            <span>
              <FaMapMarkedAlt />
            </span>
            {employee.adresse}
          </h1>
        </div>
      </div>
      <div className="max-sm:hidden w-[90vw] px-5 pt-5 flex flex-col place-content-center place-items-center">
        <div className="relative w-full max-w-[1000px] bg-transparent flex flex-col place-content-center place-items-center">
          <div className="bg-ThirdBlue h-fit w-full flex flex-col place-content-start gap-5 p-10 pb-20 place-items-start shadow-2xl rounded-lg">
            <GoPersonFill className="w-24 h-24 text-PrimaryBlue border-2 border-PrimaryBlue p-2 rounded-full" />
            <div>
              <h1 className="text-3xl text-start text-PrimaryBlue">{employee.nom}</h1>
              <h1 className={`text-lg text-PrimaryBlue`}>{employee.prenom}</h1>
            </div>
          </div>
          <div className="w-11/12 flex place-content-center place-items-center py-10 gap-5 rounded-xl absolute -bottom-20 shadow-2xl h-32 max-w-[800px] bg-PrimaryBlue">
            <h1 className="flex text-white text-nowrap max-lg:text-xl max-md:text-base text-2xl gap-3 border-r-2 border-r-white pr-5 h-full place-content-center place-items-center">
              <span>
                <FaPerson />
              </span>
              {employee.type}
            </h1>
            <h1 className="flex text-white text-nowrap max-lg:text-xl max-md:text-base text-2xl gap-3 border-r-2 border-r-white pr-5 h-full place-content-center place-items-center">
              <span>
                <FaBuilding />
              </span>
              {employee.email}
            </h1>
            <h1 className="flex text-white text-nowrap max-lg:text-xl max-md:text-base text-2xl gap-3 h-full place-content-center place-items-center">
              <span>
                <FaMapMarkedAlt />
              </span>
              {employee.adresse}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
