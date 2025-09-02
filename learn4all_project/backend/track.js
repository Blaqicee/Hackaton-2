const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Track", TrackSchema);
