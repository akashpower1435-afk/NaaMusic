import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function PlayerPage() {

  const location = useLocation();

  const { songs = [], index = 0 } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(index);
  const currentSong = songs[currentIndex];

  const audioRef = useRef(null);
  const lyricRefs = useRef([]);
  const [currentTime, setCurrentTime] = useState(0);

  // 🎧 Parse lyrics
  const parseLyrics = (lyrics) => {
    if (!lyrics) return [];

    return lyrics
      .split("\n")
      .map((line) => {
        const match = line.match(/\[(\d+):(\d+)\](.*)/);
        if (!match) return null;

        const min = parseInt(match[1]);
        const sec = parseInt(match[2]);

        return {
          time: min * 60 + sec,
          text: match[3].trim(),
        };
      })
      .filter(Boolean);
  };

  const parsedLyrics = parseLyrics(currentSong?.originalLyrics);
  const parsedTranslated = parseLyrics(currentSong?.translatedLyrics);

  // 🎧 Track audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [currentSong]);

  // 🎯 Auto scroll
  useEffect(() => {
    const activeIndex = parsedLyrics.findIndex((line, i) => {
      const next = parsedLyrics[i + 1];
      return currentTime >= line.time && (!next || currentTime < next.time);
    });

    if (activeIndex !== -1 && lyricRefs.current[activeIndex]) {
      lyricRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [currentTime, parsedLyrics]);

  // ⏭ Controls
  const nextSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentTime(0);
    }
  };

  const prevSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTime(0);
    }
  };

  if (!currentSong) {
    return <h2 style={{ color: "white", textAlign: "center" }}>No song selected</h2>;
  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* 🎵 TITLE */}
        <h1 style={styles.title}>
          {currentSong.songtitle}
        </h1>

        <h3 style={{ color: "#ccc" }}>{currentSong.artist}</h3>

        {/* 🎧 AUDIO */}
        <audio
          key={currentSong.audiourl}
          ref={audioRef}
          controls
          autoPlay
          src={process.env.PUBLIC_URL + currentSong.audiourl}
        />

        {/* 🎮 CONTROLS */}
        <div>
          <button onClick={prevSong} style={styles.btn}>⏮</button>
          <button onClick={nextSong} style={styles.btn}>⏭</button>
        </div>

        {/* 📜 LYRICS */}
        <div style={styles.lyricsBox}>
          {parsedLyrics.map((line, i) => {

            const next = parsedLyrics[i + 1];

            const isActive =
              currentTime >= line.time &&
              (!next || currentTime < next.time);

            return (
              <div
                key={i}
                ref={(el) => (lyricRefs.current[i] = el)}
                style={styles.lineContainer} // 🔥 spacing here
              >

                {/* ORIGINAL */}
                <div style={{
                  fontSize: isActive ? "22px" : "16px",
                  color: isActive ? "#ff4da6" : "#aaa",
                  fontWeight: isActive ? "bold" : "normal",
                  lineHeight: "1.8",
                  textShadow: isActive ? "0 0 10px #ff4da6" : "none",
                  transition: "all 0.3s ease"
                }}>
                  {line.text}
                </div>

                {/* TRANSLATION */}
                {parsedTranslated[i] && (
                  <div style={{
                    marginTop: "6px", // 🔥 gap between original & translation
                    fontSize: "14px",
                    color: isActive ? "#ff99cc" : "#555",
                    lineHeight: "1.6"
                  }}>
                    {parsedTranslated[i].text}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle, #001a2e, #000)"
  },

  card: {
    width: "90%",
    maxWidth: "500px",
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    textAlign: "center"
  },

  title: {
    color: "#00bfff",
    textShadow: "0 0 10px #00bfff, 0 0 20px #00bfff"
  },

  btn: {
    margin: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#00bfff",
    color: "white",
    cursor: "pointer"
  },

  lyricsBox: {
    height: "300px",
    overflowY: "auto",
    marginTop: "20px",
    padding: "10px"
  },

  // 🔥 MAIN FIX HERE
  lineContainer: {
    marginBottom: "14px", // 👈 gap between each lyric line
    padding: "6px 0"
  }
};

export default PlayerPage;