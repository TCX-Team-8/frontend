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
    matricule: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file)); // Preview the uploaded file
    }
  };

  const validate = (): Errors => {
    const errors: Errors = {};
    if (!formData.nom.trim()) errors.nom = 'Nom is required.';
    if (!formData.prenom.trim()) errors.prenom = 'Prénom is required.';
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid.';
    }
    if (!formData.tel) {
      errors.tel = 'Téléphone is required.';
    } else if (!/^\d+$/.test(formData.tel)) {
      errors.tel = 'Téléphone must contain only numbers.';
    }
    if (!formData.nss) {
      errors.nss = 'NSS is required.';
    } else if (!/^\d+$/.test(formData.nss)) {
      errors.nss = 'NSS must contain only numbers.';
    }
    if (!formData.adresse.trim()) errors.adresse = 'Adresse is required.';
    if (!formData.date_naiss) errors.date_naiss = 'Date de naissance is required.';
    if (!formData.departement) errors.departement = 'Département is required.';
    if (!formData.photo) errors.photo = 'Photo is required.';
    if (!formData.mdp) {
      errors.mdp = 'Mot de passe is required.';
    } else if (formData.mdp.length < 6) {
      errors.mdp = 'Mot de passe must be at least 6 characters.';
    }
    if (!formData.matricule.trim()) errors.matricule = 'Matricule is required.';
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof File) {
        data.append(key, value);
      } else {
        data.append(key, value.toString());
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
        alert('Account created successfully!');
        setFormData({
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
          matricule: '',
        });
        setPhotoPreview(null);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[60vw] max-md:w-screen max-md:self-center mx-auto p-4 bg-white shadow-md rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {['nom', 'prenom', 'email', 'tel', 'nss', 'adresse', 'matricule'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 text-start capitalize">
                {field.replace('_', ' ')}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}
          <div>
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
          <div>
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
            </select>
            {errors.departement && <p className="text-red-500 text-sm">{errors.departement}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 text-start">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
          </div>
          {photoPreview && (
            <div className="mt-4">
              <img src={photoPreview} alt="Preview" className="w-32 h-32 rounded-lg" />
            </div>
          )}
          <div>
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
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className={`w-full py-2 rounded-lg focus:outline-none ${
              isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Create Account'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
