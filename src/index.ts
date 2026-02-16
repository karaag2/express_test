import "dotenv/config";
import express from "express";
import {connectDB,disconnectDB} from "@/config/db.js";
import multer from 'multer'
import { toNodeHandler } from "better-auth/node";
import cors from "cors"; // Import the CORS middlewar

import {authMiddleware} from "@/middlewares/auth.middleware.js";
import cookieParser from 'cookie-parser'
//Importing routes
import TASK from '@/routes/taskRoute.js'
import AUTH from '@/routes/authRoutes.js'
await connectDB();
const app = express();
const PORT =process.env.PORT || 3000

//Body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(multer().none());
app.use(cookieParser())



//API routes
app.use('/task',authMiddleware, TASK);
app.use('/auth', AUTH);
// app.all("/api/auth/*", toNodeHandler(auth));

const server = app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)});
// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});