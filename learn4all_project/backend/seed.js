const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Track = require("./model/track.js");  // 👈 notice .js at the end

dotenv.config();

const seedTracks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected for seeding");

    // Sample data
    const tracks = [
      {
        title: "Mathematics Basics",
        description: "Learn numbers, addition, and subtraction."
      },
      {
        title: "English Literacy",
        description: "Improve reading, writing, and comprehension skills."
      },
      {
        title: "Science Fundamentals",
        description: "Discover the basics of biology, chemistry, and physics."
      }
    ];

    // Clear old data
    await Track.deleteMany({});
    console.log("🗑️ Old tracks removed");

    // Insert new data
    await Track.insertMany(tracks);
    console.log("🌱 Demo tracks seeded successfully!");

    mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedTracks();
