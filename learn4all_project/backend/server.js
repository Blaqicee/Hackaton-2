import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learn4all', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TrackSchema = new mongoose.Schema({
  title: String,
  level: String,
  description: String,
  lessons: [
    {
      title: String,
      minutes: Number,
      text: String,
      quiz: {
        q: String,
        options: [String],
        answer: Number,
      },
    },
  ],
});

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trackId: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
  lessons: {},
});

const User = mongoose.model('User', UserSchema);
const Track = mongoose.model('Track', TrackSchema);
const Progress = mongoose.model('Progress', ProgressSchema);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tracks', async (req, res) => {
  const tracks = await Track.find();
  res.json(tracks);
});

app.post('/api/tracks', async (req, res) => {
  try {
    const track = new Track(req.body);
    await track.save();
    res.status(201).json(track);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/progress', async (req, res) => {
  const { userId, trackId, lessons } = req.body;
  let progress = await Progress.findOne({ userId, trackId });
  if (!progress) progress = new Progress({ userId, trackId, lessons });
  else progress.lessons = { ...progress.lessons, ...lessons };
  await progress.save();
  res.json(progress);
});

app.get('/api/progress/:userId', async (req, res) => {
  const { userId } = req.params;
  const progress = await Progress.find({ userId });
  res.json(progress);
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
