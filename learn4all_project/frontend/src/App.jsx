import React, { useEffect, useState } from "react";

const API_URL = "https://hackaton-2-backend.onrender.com/api";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/tracks`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tracks");
        }
        return res.json();
      })
      .then((data) => {
        setTracks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("Could not load tracks");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Learn4All - SDG 4 Education</h1>
      <h2>Available Tracks</h2>

      {loading && <p>Loading tracks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && tracks.length === 0 && <p>No tracks yet.</p>}

      <ul>
        {tracks.map((t) => (
          <li key={t._id || t.title}>
            <strong>{t.title || "Untitled"}</strong> – {t.description || "No description"}
          </li>
        ))}
      </ul>
    </div>
  );
}

