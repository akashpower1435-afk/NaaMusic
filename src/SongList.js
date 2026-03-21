import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SongList() {
  const { language } = useParams();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/songs.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (song) =>
            song.language &&
            language &&
            song.language.toLowerCase() === language.toLowerCase()
        );

        setSongs(filtered);
      });
  }, [language]);

  return (
    <div style={styles.container}>
      {/* 🔥 Background */}
      <div style={styles.bgImage}></div>

      {/* 🌈 Overlay */}
      <div style={styles.overlay}></div>

      {/* CONTENT */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          {language.toUpperCase()} SONGS
        </h1>

        <div style={styles.list}>
          {songs.map((song, index) => (
            <div
              key={song.id}
              style={styles.card}
              onClick={() =>
                navigate("/player", {
                  state: { songs, index }
                })
              }
            >
              <div style={styles.songTitle}>{song.songtitle}</div>
              <div style={styles.artist}>{song.artist}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ Animation */}
      <style>
        {`
          @keyframes zoom {
            0% { transform: scale(1.1); }
            100% { transform: scale(1.2); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden"
  },

  // 🌌 Background
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage:
      'url("https://wallpaperaccess.com/full/4725713.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(8px) brightness(0.4)",
    transform: "scale(1.1)",
    animation: "zoom 20s infinite alternate ease-in-out"
  },

  // 🌈 Overlay
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.95))"
  },

  // 📦 Content
  content: {
    position: "relative",
    zIndex: 2,
    padding: "40px",
    color: "white"
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#00bfff",
    textShadow: "0 0 10px #00bfff"
  },

  list: {
    display: "grid",
    gap: "15px"
  },

  // 💎 Card
  card: {
    padding: "15px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },

  songTitle: {
    fontSize: "18px",
    fontWeight: "bold"
  },

  artist: {
    fontSize: "14px",
    color: "#bbb"
  }
};

export default SongList;