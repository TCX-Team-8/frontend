import React, { useState } from 'react';
import WebcamCapture from './WebCamCapture';

interface Data {
  userId: string;
  dateTime: string;
  photo: string | null;
}

export default function Reconnaissance() {
  const [fileName, setFileName] = useState<string>('');
  const [showCam, setShowCam] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);  // State to store the captured image
  const [userId, setUserId] = useState<string>('12345');  // Assuming user ID is available
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To handle form submission
  const [isPhotoImported, setIsPhotoImported] = useState<boolean>(false); // To toggle between photo import and webcam capture

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setCapturedImage(URL.createObjectURL(file));  // Display selected image directly
      setIsPhotoImported(true);  // Indicate that a photo has been imported
    }
  };

  const activateCam = () => {
    setShowCam(true);
    setIsPhotoImported(false);  // Reset photo import flag when activating camera
  };

  const handleCapture = (image: string) => {
    setCapturedImage(image);  // Save the captured image in the parent component
    setIsPhotoImported(true);  // Indicate that a photo has been captured
  };

  const handleSubmit = async () => {
    if (!capturedImage) {
      alert("Veuillez capturer une image.");
      return;
    }

    const currentDate = new Date().toISOString(); // Get the current date and time
    const data: Data = {
      userId,
      dateTime: currentDate,
      photo: capturedImage,  // Assuming `capturedImage` is in base64 format
    };

    setIsSubmitting(true);

    try {
      // Send data to backend (replace with your backend API URL)
      const response = await fetch('https://your-backend-api.com/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Données envoyées avec succès !");
      } else {
        alert("Erreur lors de l'envoi des données.");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Une erreur s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-black">
      <div className="w-full max-w-lg p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        <h1 className="text-xl font-bold mb-4 text-center">Reconnaissance faciale</h1>
        
        <label className="text-sm mb-2 block">Sélectionnez vos horaires</label>
        <select className="mb-4 p-2 border border-gray-300 rounded w-full">
          <option value="check-in">Check - in</option>
          <option value="check-out">Check - out</option>
        </select>

        <div className="flex flex-col items-center mb-4 gap-10">
          {/* Import photo option */}
          {!isPhotoImported && !showCam && (
            <>
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
                Importer une photo
              </label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </>
          )}

          {/* Webcam capture option */}
          {!isPhotoImported && !fileName && !showCam && (
            <button
              onClick={activateCam}
              className="capture-btn px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
            >
              Activer la caméra
            </button>
          )}

          {/* Display selected or captured image */}
          {capturedImage && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Image capturée :</h3>
              <img src={capturedImage} alt="Captured" className="captured-img mt-2 rounded-md shadow-md" />
            </div>
          )}
        </div>

        {showCam && <WebcamCapture onCapture={handleCapture} />}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="submit-btn w-full place-items-center place-content-center px-6 py-2 mt-4 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isSubmitting ? "Envoi en cours..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
