import axios from 'axios';

export const matchCV = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: 'cvFile is required' });
        }

        const mlHost = process.env.ML_HOST || 'http://127.0.0.1:5000';

        // Build multipart form-data for FastAPI
        const FormData = (await import('form-data')).default;
        const form = new FormData();
        form.append('file', file.buffer, { filename: file.originalname, contentType: file.mimetype });

        const response = await axios.post(`${mlHost}/predict`, form, {
            headers: form.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        return res.status(200).json(response.data);
    } catch (err) {
        const status = err.response?.status || 500;
        const data = err.response?.data || { success: false, error: err.message };
        return res.status(status).json(data);
    }
};
