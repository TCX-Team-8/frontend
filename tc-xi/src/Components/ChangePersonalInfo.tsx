import React, { useState, useEffect, ChangeEvent } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import Loading from "../Pages/loading";

// Define the shape of the personalInfo state
interface PersonalInfo {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  nss: string;
  adresse: string;
  date_naiss: string;
  departement: string;
  photo: string;
  mdp: string;
  matricule: string;
}

type EditMode = Record<keyof PersonalInfo, boolean>;

const ChangePersonalInfo: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null); // Initialize with null until data is fetched
  const [editMode, setEditMode] = useState<EditMode>({
    nom: false,
    prenom: false,
    email: false,
    tel: false,
    nss: false,
    adresse: false,
    date_naiss: false,
    departement: false,
    photo: false,
    mdp: false,
    matricule: false,
  });

  // Fetch personal info from the backend
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch("/api/personal-info"); // Replace with your backend endpoint
        const data = await response.json();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    fetchPersonalInfo();
  }, []);

  const handleChange = (field: keyof PersonalInfo, value: string): void => {
    if (!personalInfo) return;
    setPersonalInfo((prevState) => ({
      ...prevState!,
      [field]: value,
    }));
  };

  const handleEditToggle = (field: keyof PersonalInfo): void => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && personalInfo) {
      setPersonalInfo((prevState) => ({
        ...prevState!,
        photo: URL.createObjectURL(file),
      }));
    }
  };

  // Save changes to the backend
  const saveChanges = async () => {
    try {
      const response = await fetch("/api/personal-info", {
        method: "PUT", // or POST depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes");
    }
  };

  if (!personalInfo) {
    return <Loading/>;
  }

  return (
    <div className="p-4 w-full h-full">
      <div className="font-semibold text-xl text-center mb-4 ml-0">Informations personnelles</div>
      <div className="flex flex-col items-center gap-4">
        {Object.keys(personalInfo).map((field) => (
          <div
            key={field}
            className="p-2 bg-gray-100 w-full max-w-4xl rounded-md shadow-md flex items-center gap-4 justify-between"
          >
            <label htmlFor={field} className="text-sm font-medium text-gray-700 w-1/4">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>

            {field === "photo" ? (
              <div className="flex items-center gap-4">
                {editMode[field as keyof EditMode] ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border w-full sm:w-4/5 md:w-[50rem] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <img
                    src={personalInfo.photo}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </div>
            ) : (
              <input
                id={field}
                type="text"
                name={field}
                placeholder={personalInfo[field as keyof PersonalInfo]}
                value={personalInfo[field as keyof PersonalInfo]}
                className="border text-black w-full sm:w-4/5 md:w-[40rem] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleChange(field as keyof PersonalInfo, e.target.value)}
                disabled={!editMode[field as keyof EditMode]}
              />
            )}

            <button
              onClick={() => handleEditToggle(field as keyof PersonalInfo)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              <BiSolidEditAlt />
            </button>
          </div>
        ))}
        <button
          onClick={saveChanges}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ChangePersonalInfo;
