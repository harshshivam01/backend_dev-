import  { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadedFileUrl(response.data.fileUrl);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadedFileUrl && (
                <div>
                    {uploadedFileUrl.endsWith('.pdf') ? (
                        <iframe src={uploadedFileUrl} width="100%" height="500px" />
                    ) : (
                        <img src={uploadedFileUrl} alt="Uploaded file" style={{ width: '100%' }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
