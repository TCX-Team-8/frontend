import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  nss: string;
  adresse: string;
  date_naiss: string;
  departement: string;
  photo: File | null;
  mdp: string;
  matricule: string;
}

interface Errors {
  [key: string]: string;
}

function AccountForm() {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    nss: '',
    adresse: '',
    date_naiss: '',
    departement: '',
    photo: null,
    mdp: '',
    matricule: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    }
  };

  const validate = (): Errors => {
    const errors: Errors = {};
    
    if (!formData.nom) errors.nom = 'Nom is required';
    if (!formData.prenom) errors.prenom = 'Prénom is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid';
    }
    if (!formData.tel) errors.tel = 'Téléphone is required';
    if (!formData.nss) errors.nss = 'NSS is required';
    if (!formData.adresse) errors.adresse = 'Adresse is required';
    if (!formData.date_naiss) errors.date_naiss = 'Date de naissance is required';
    if (!formData.departement) errors.departement = 'Département is required';
    if (!formData.photo) errors.photo = 'Photo is required';
    if (!formData.mdp) errors.mdp = 'Mot de passe is required';
    if (formData.mdp && formData.mdp.length < 6) errors.mdp = 'Mot de passe must be at least 6 characters';
    if (!formData.matricule) errors.matricule = 'Matricule is required';

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      
      // Prepare form data for sending
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photo" && value instanceof File) {
          data.append(key, value); // Append the file
        } else {
          data.append(key, value.toString()); // Append other fields as strings
        }
      });
  
      try {
        const response = await fetch('https://your-api-endpoint.com/submit', {
          method: 'POST',
          body: data,
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Submission failed:', errorData);
          alert('Failed to create the account. Please try again.');
        } else {
          const result = await response.json();
          console.log('Submission successful:', result);
          alert('Account created successfully!');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while submitting the form.');
      }
    }
  };
  

  return (
    <div className="w-[60vw] mx-auto p-4 bg-white shadow-md rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-start">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-start">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Téléphone</label>
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.tel && <p className="text-red-500 text-sm">{errors.tel}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">NSS</label>
          <input
            type="text"
            name="nss"
            value={formData.nss}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.nss && <p className="text-red-500 text-sm">{errors.nss}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Adresse</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.adresse && <p className="text-red-500 text-sm">{errors.adresse}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Date de naissance</label>
          <input
            type="date"
            name="date_naiss"
            value={formData.date_naiss}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.date_naiss && <p className="text-red-500 text-sm">{errors.date_naiss}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Département</label>
          <select
            name="departement"
            value={formData.departement}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Department</option>
            <option value="hr">HR</option>
            <option value="management">Management</option>
            <option value="development">Development</option>
            {/* Add more options as needed */}
          </select>
          {errors.departement && <p className="text-red-500 text-sm">{errors.departement}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Mot de passe</label>
          <input
            type="password"
            name="mdp"
            value={formData.mdp}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.mdp && <p className="text-red-500 text-sm">{errors.mdp}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 text-start">Matricule</label>
          <input
            type="text"
            name="matricule"
            value={formData.matricule}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.matricule && <p className="text-red-500 text-sm">{errors.matricule}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
