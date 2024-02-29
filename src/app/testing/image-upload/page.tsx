"use client"
import React, { useState } from 'react';
import axios from 'axios';

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (files && files.length > 0) {
      setUploading(true);
      try {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }
        await axios.post('/testing/api/image-upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Files uploaded successfully!');
      } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <h1>Upload Images</h1>
      <input type="file" multiple onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} disabled={!files || uploading}>
        Upload
      </button>
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default UploadPage;
