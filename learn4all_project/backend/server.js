const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Root Route (fixes "CANNOT GET /")
app.get("/", (req, res) => {
  res.send("✅ Learn4All Backend is running. Go to /api/tracks to see data.");
});

// Example API route (tracks)
app.get("/api/tracks", async (req, res) => {
  try {
    res.json([]); // placeholder until you seed data
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
