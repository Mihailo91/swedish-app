const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

//Error middleware
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//to accept form data
app.use(express.urlencoded({ extended: false }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "UP!" });
});

// Newsletter subscription route
app.use("/api/subscribe", require("./routes/newsletterRoutes"));

app.use(errorHandler);
app.use(
  cors({
    origin: "https://swedishmyway.com",
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
