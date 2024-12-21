import React, { useState, ChangeEvent } from "react";
import { BiSolidEditAlt } from "react-icons/bi";

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
  // Define the state with default personal information, including the image path
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    nom: "Caline",
    prenom: "Doe",
    email: "caline.doe@example.com",
    tel: "123-456-7890",
    nss: "987-654-3210",
    adresse: "123 Main St",
    date_naiss: "2004-01-01",
    departement: "IT",
    photo: "/images/default-photo.png",  // Default image path
    mdp: "password123",
    matricule: "12345",
  });

  // State to track which fields are being edited
  const [editMode, setEditMode] = useState<EditMode>({
    nom: false,
    prenom: false,
    email: false,
    tel: false,
    nss: false,
    adresse: false,
    date_naiss: false,
    departement: false,
    photo: false,  // Only allow photo field to be edited
    mdp: false,
    matricule: false,
  });

  // Handle input change and update state accordingly
  const handleChange = (field: keyof PersonalInfo, value: string): void => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Toggle edit mode for the field
  const handleEditToggle = (field: keyof PersonalInfo): void => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPersonalInfo((prevState) => ({
        ...prevState,
        photo: URL.createObjectURL(file),  // Create an object URL for the selected image
      }));
    }
  };

  return (
    <div className="p-4 w-full h-full">
      <div className="font-semibold text-xl text-center mb-4 ml-0">Informations personnelles</div>
      <div className="flex flex-col items-center gap-4 ">
        {Object.keys(personalInfo).map((field) => (
          <div
            key={field}
            className="p-2 bg-gray-100 w-full max-w-4xl rounded-md shadow-md flex items-center gap-4 justify-between"
          >
            <label htmlFor={field} className="text-sm font-medium text-gray-700 w-1/4">{field.charAt(0).toUpperCase() + field.slice(1)}</label>

            {field === "photo" ? (
              <div className="flex items-center gap-4 ">
                {/* If in edit mode, show the file input */}
                {editMode[field as keyof EditMode] ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border w-full sm:w-4/5 md:w-[50rem] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  // If not in edit mode, show the image
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
      </div>
    </div>
  );
};

export default ChangePersonalInfo;
