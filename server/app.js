import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    }),
);
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy",
    });
});

const startServer = async () => {
    try {
        await connectDb();
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error("Server error:", err.message);
    }
};

startServer();
