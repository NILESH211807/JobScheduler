import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import jobsRouter from "./routes/job.router.js";
import dashRouter from "./routes/dash.router.js";

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

// routes
app.use("/api/jobs", jobsRouter);
app.use("/api/dash", dashRouter);


app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
