import React, { useState } from "react";
import WebcamCapture from "../../../Components/WebCamCapture";

interface Data {
  userId: string;
  dateTime: string;
  photo: string | null; // Base64 string or URL
}

export default function Reconnaissance() {
  const [fileName, setFileName] = useState<string>("");
  const [showCam, setShowCam] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // State to store the captured image
  const [userId, setUserId] = useState<string>("12345"); // Assuming user ID is available
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To handle form submission
  const [isPhotoImported, setIsPhotoImported] = useState<boolean>(false); // To toggle between photo import and webcam capture
  const [checkType, setCheckType] = useState<string>("check-in"); // Default selection for check-in

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result as string); // Convert file to base64
        setIsPhotoImported(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const activateCam = () => {
    setShowCam(true);
    setIsPhotoImported(false); // Reset photo import flag when activating camera
  };

  const handleCapture = (image: string) => {
    setCapturedImage(image); // Save the captured image in base64 format
    setIsPhotoImported(true); // Indicate that a photo has been captured
    setShowCam(false); // Hide the webcam interface
  };

  const handleSubmit = async () => {
    if (!capturedImage) {
      alert("Veuillez capturer ou importer une image.");
      return;
    }

    const currentDate = new Date().toISOString(); // Get the current date and time
    const data: Data = {
      userId,
      dateTime: currentDate,
      photo: capturedImage, // Base64 image string
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("https://your-backend-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Données envoyées avec succès !");
        setCapturedImage(null);
        setFileName("");
        setIsPhotoImported(false);
      } else {
        alert("Erreur lors de l'envoi des données.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[80vw] h-[100vh] flex flex-col items-center justify-center p-4 text-black">
      <div className="w-full p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
        <h1 className="text-xl font-bold mb-4 text-center">Reconnaissance faciale</h1>

        <label className="text-sm mb-2 block">Sélectionnez vos horaires</label>
        <select
          value={checkType}
          onChange={(e) => setCheckType(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        >
          <option value="check-in">Check - in</option>
          <option value="check-out">Check - out</option>
        </select>

        <div className="w-full flex flex-col items-center mb-4 gap-4">
          {/* Import photo option */}
          {!isPhotoImported && !showCam && (
            <>
              <label
                htmlFor="attachment"
                className="flex items-center gap-3 px-6 py-3 bg-blue-500 text-white text-sm font-bold uppercase rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
              >
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
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              Activer la caméra
            </button>
          )}

          {/* Display selected or captured image */}
          {capturedImage && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Image capturée :</h3>
              <img src={capturedImage} alt="Captured" className="mt-2 rounded-md shadow-md max-h-64" />
            </div>
          )}
        </div>

        {showCam && <WebcamCapture onCapture={handleCapture} />}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full px-6 py-2 mt-4 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          {isSubmitting ? "Envoi en cours..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
