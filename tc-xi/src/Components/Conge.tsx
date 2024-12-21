import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  date_debut: string;
  date_fin: string;
  Motif: string;
  type_conge: string; // Nouveau champ pour le type de congé
  attachment?: File;  // Optional, as it is not mandatory initially
}

const LeaveRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date_debut: '',
    date_fin: '',
    Motif: '',
    type_conge: '',
    attachment: undefined,
  });

  const [fileName, setFileName] = useState<string>(''); // État pour le nom du fichier sélectionné

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // Mettre à jour le nom du fichier
      setFormData((prev) => ({ ...prev, attachment: file }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Demande de Congé</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date_debut" className="block text-sm font-semibold text-gray-700">
            Date de Début
          </label>
          <input
            type="date"
            id="date_debut"
            name="date_debut"
            value={formData.date_debut}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:[#1c1b32]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date_fin" className="block text-sm font-semibold text-gray-700">
            Date de Fin
          </label>
          <input
            type="date"
            id="date_fin"
            name="date_fin"
            value={formData.date_fin}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:[#1c1b32]"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type_conge" className="block text-sm font-semibold text-gray-700">
            Type de Congé
          </label>
          <select
            id="type_conge"
            name="type_conge"
            value={formData.type_conge}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:[#1c1b32]"
            required
          >
            <option value="">-- Sélectionnez un type --</option>
            <option value="maladie">Maladie</option>
            <option value="RTT">RTT</option>
            <option value="personnel">Personnel</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="Motif" className="block text-sm font-semibold text-gray-700">
            Raison
          </label>
          <textarea
            id="Motif"
            name="Motif"
            value={formData.Motif}
            onChange={handleChange}
            rows={4}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:[#1c1b32]"
            required
          />
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="attachment"
            className="flex items-center gap-3 px-6 py-3 bg-blue-500 text-white text-sm font-bold uppercase rounded-md shadow-md hover:shadow-lg focus:opacity-85 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <svg
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                strokeWidth={2}
                stroke="#ffffff"
                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={2}
                stroke="#ffffff"
                d="M17 15V18M17 21V18M17 18H14M17 18H20"
              />
            </svg>
            Attacher un fichier
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            required
          />
          {fileName && (
            <p className="mt-2 text-sm text-gray-700">
              <strong>Fichier sélectionné :</strong> {fileName}
            </p>
          )}
        </div>

        <div className="mt-6 w-fit mx-auto">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-400 text-white font-bold rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
