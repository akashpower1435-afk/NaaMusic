import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import Player from "./Player"; // Assuming this is your basic controls component
import Lyrics from "./Lyrics";

function PlayerPage() {
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.sidebar}>
        <SongList onSelect={setSelectedSong} />
      </div>

      <div style={styles.main}>
        {selectedSong ? (
          <div style={styles.contentWrapper}>
            <div style={styles.top}>
              <img src={process.env.PUBLIC_URL + selectedSong.image} alt="" style={styles.cover} />
              <h2 style={{margin: '10px 0'}}>{selectedSong.songtitle}</h2>
              <p style={{color: '#aaa'}}>{selectedSong.artist}</p>
            </div>

            <div style={styles.lyricsContainer}>
              <Lyrics song={selectedSong} />
            </div>
          </div>
        ) : (
          <div style={styles.placeholder}>Select a song from the list 🎧</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  // ... other styles stay the same
  main: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1,
    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))", // Fade background
  },
  lyricsContainer: {
    flex: 1,
    overflow: "hidden", // Disable manual scroll to keep it synced
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default PlayerPage;
// ... imports stay the same

// Use the updated Lyrics component inside this page