import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

// Define the prop types for the component
interface WebcamCaptureProps {
  onCapture: (image: any) => void;  // Type for the onCapture function prop
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const capture = () => {
    const image = webcamRef.current?.getScreenshot();  // Safe call to getScreenshot
    if (image) {
      setImageSrc(image);
      onCapture(image);  // Call the parent function and pass the captured image
    }
  };

  const uploadImage = async () => {
    if (imageSrc) {
      try {
        setIsUploading(true);

        // Prepare the data to send to the backend (image as base64)
        const formData = new FormData();
        formData.append('image', imageSrc);

        // Send the captured image to the backend
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          // Handle response if necessary (e.g., show a success message)
          alert('Image uploaded successfully');
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        setErrorMessage('Failed to upload the image.');
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const downloadImage = () => {
    if (imageSrc) {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = 'screenshot.jpg';
      link.click();
    }
  };

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-80"
      />
      <button
        onClick={capture}
        className="capture-btn px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Prendre une photo
      </button>

      {isUploading && <div>Uploading...</div>}

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {imageSrc && (
        <div className="photo-preview">
          <h3>Photo prise :</h3>
          <img src={imageSrc} alt="Preview" className="preview-img" />
          <button
            onClick={downloadImage}
            className="capture-btn px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Télécharger
          </button>
          <button
            onClick={uploadImage}
            className="capture-btn px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            disabled={isUploading}
          >
            Télécharger sur le serveur
          </button>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
