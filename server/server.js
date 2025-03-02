const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const authRoutes = require("./routes/auth");

// Database connection with hardcoded URL
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/auth", authRoutes);

// Hardcoded port
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
