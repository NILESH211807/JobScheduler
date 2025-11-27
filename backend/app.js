import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import jobsRouter from "./routes/job.router.js";
import dashRouter from "./routes/dash.router.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// cors
app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// routes
app.use("/api/jobs", jobsRouter);
app.use("/api/dash", dashRouter);


app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
