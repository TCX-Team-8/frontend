import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  date_debut: string;
  date_fin: string;
  Motif: string;
  type_conge: string;
  attachment?: File;
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
  const [loading, setLoading] = useState<boolean>(false); // Indique si la requête est en cours
  const [successMessage, setSuccessMessage] = useState<string>(''); // Message de succès
  const [errorMessage, setErrorMessage] = useState<string>(''); // Message d'erreur

  // Gérer les modifications des champs du formulaire
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer le changement de fichier
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({ ...prev, attachment: file }));
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validation : vérifier si la date de fin est postérieure à la date de début
    if (new Date(formData.date_fin) < new Date(formData.date_debut)) {
      setErrorMessage('La date de fin doit être postérieure à la date de début.');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('date_debut', formData.date_debut);
      formDataToSend.append('date_fin', formData.date_fin);
      formDataToSend.append('Motif', formData.Motif);
      formDataToSend.append('type_conge', formData.type_conge);
      if (formData.attachment) {
        formDataToSend.append('attachment', formData.attachment);
      }

      const response = await fetch('/api/leave-request', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du formulaire.');
      }

      setSuccessMessage('Demande envoyée avec succès !');
      setFormData({
        date_debut: '',
        date_fin: '',
        Motif: '',
        type_conge: '',
        attachment: undefined,
      });
      setFileName('');
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Demande de Congé</h2>
      {successMessage && (
        <div className="mb-4 text-green-600 font-medium">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
      )}
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="attachment"
            className="flex items-center gap-3 px-6 py-3 bg-blue-500 text-white text-sm font-bold uppercase rounded-md shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
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

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Soumission...' : 'Soumettre'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
