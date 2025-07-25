import express from "express";
import cors from "cors";
import { router } from "./routes/routes";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: "Champions League API",
    version: "1.0.0",
    endpoints: {
      clubs: "/api/clubs",
      players: "/api/players"
    }
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found"
  });
});

export { app };
