const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for frontend communication
app.use(cors());

// Ensure JSON parsing if needed in other routes
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File type validation
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (isValidType) {
            cb(null, true);
        } else {
            cb(new Error('Only images and PDFs are allowed'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// Upload route
app.post('/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('Error during file upload:', err);
            if (err.message) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.status(200).json({ message: 'File uploaded successfully', fileUrl });
    });
});

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Health check route (optional)
app.get('/', (req, res) => {
    res.send('File upload server is running.');
});

// Handle unhandled errors globally
process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));
process.on('unhandledRejection', (reason) => console.error('Unhandled Rejection:', reason));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Upload files via POST /upload');
});
