const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

//Error middleware
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//to accept form data
app.use(express.urlencoded({ extended: false }));

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "UP!" });
});

// Newsletter subscription route
app.use("/api/subscribe", require("./routes/newsletterRoutes"));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Swedish my way app" });
});

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://swedishmyway.com", "https://www.swedishmyway.com"]
      : "http://localhost:5000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
