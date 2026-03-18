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
      <h1 style={styles.title}>{language.toUpperCase()} SONGS</h1>

      <div style={styles.list}>
        {songs.map((song, index) => (
          <div
            key={song.id}
            style={styles.card}
            onClick={() =>
              navigate("/player", {
                state: {
                  songs,
                  index
                }
              })
            }
          >
            {song.songtitle} - {song.artist}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(#0a0a1a, #000)",
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

  card: {
    padding: "15px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    cursor: "pointer",
    transition: "0.3s",
    color: "#fff"
  }
};

export default SongList;