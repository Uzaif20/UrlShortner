
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connect_db from "./config/db.js";
import urlRoutes from "./routes/UrlRoutes.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Connect database
connect_db();

// Routes
app.use(urlRoutes);
app.use(authRoutes);



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on("error", (error) => {
    console.error("SERVER ERROR:", error);
});

