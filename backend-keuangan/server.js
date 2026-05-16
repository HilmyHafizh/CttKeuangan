const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// route dulu (biar selalu respons)
app.get("/", (req, res) => {
  console.log("GET / hit");
  res.send("Backend jalan 🚀");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

// koneksi Mongo (tidak nge-block app)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});