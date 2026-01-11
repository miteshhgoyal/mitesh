import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400
}));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.get('/', (req, res) => {
    res.json({
        message: 'Finance Managing API is running!',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);

    if (err.message === 'File too large') {
        return res.status(413).json({
            message: 'File size too large',
            error: 'PAYLOAD_TOO_LARGE'
        });
    }

    if (err.message.includes('Unexpected end of form')) {
        return res.status(400).json({
            message: 'Multipart form data error',
            error: 'FORM_PARSING_ERROR'
        });
    }

    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`API URL: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("DB connection failed:", err);
        process.exit(1);
    });

export default app;
