import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api'; // change to your Render URL

export default function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tracks`).then(res => res.json()).then(setTracks);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Learn4All - SDG 4 Education</h1>
      <h2>Tracks</h2>
      <ul>
        {tracks.map(t => (
          <li key={t._id}>{t.title} - {t.description}</li>
        ))}
      </ul>
    </div>
  );
}
