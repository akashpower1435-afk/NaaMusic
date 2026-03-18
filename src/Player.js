import React, { useState } from "react";
import SongList from "./SongList";
import Lyrics from "./Lyrics";
import Player from "./Player";

function PlayerPage() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div style={styles.container}>
      
      {/* LEFT SIDE - SONG LIST */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Songs 🎵</h2>
        <SongList onSelect={setSelectedSong} />
      </div>

      {/* RIGHT SIDE - PLAYER */}
      <div style={styles.main}>
        {selectedSong ? (
          <>
            <h1 style={styles.songTitle}>
              {selectedSong.songtitle}
            </h1>

            <Player song={selectedSong} />

            <Lyrics song={selectedSong} />
          </>
        ) : (
          <p style={styles.placeholder}>
            Select a song 🎧
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  /* MAIN BACKGROUND */
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#0a0a1a",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    fontFamily: "Poppins, sans-serif"
  },

  /* SIDEBAR */
  sidebar: {
    width: "25%",
    padding: "20px",
    borderRight: "1px solid rgba(0,150,255,0.2)",
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.03)"
  },

  sidebarTitle: {
    color: "#7dd3fc",
    marginBottom: "20px",
    textShadow: `
      0 0 5px #00bfff,
      0 0 10px #00bfff,
      0 0 20px #007bff
    `
  },

  /* MAIN CONTENT */
  main: {
    width: "75%",
    padding: "40px",
    textAlign: "center"
  },

  /* SONG TITLE (BLUE GLOW 🔥) */
  songTitle: {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#7dd3fc",
    letterSpacing: "1px",

    textShadow: `
      0 0 5px #00bfff,
      0 0 10px #00bfff,
      0 0 20px #007bff,
      0 0 40px #007bff
    `
  },

  /* EMPTY STATE */
  placeholder: {
    marginTop: "200px",
    fontSize: "22px",
    color: "#aaa",
    textShadow: "0 0 10px rgba(0,150,255,0.3)"
  }
};

export default PlayerPage;