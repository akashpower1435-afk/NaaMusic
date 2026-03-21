import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function PlayerPage() {
  const location = useLocation();
  const { songs = [], index = 0 } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(index);
  const currentSong = songs[currentIndex];

  const audioRef = useRef(null);
  const lyricRefs = useRef([]);
  const lyricsContainerRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const parseLyrics = (lyrics) => {
    if (!lyrics) return [];
    return lyrics
      .split("\n")
      .map((line) => {
  const match = line.match(/\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)/);

if (!match) return null;

const minutes = parseInt(match[1]);
const seconds = parseFloat(match[2]);

return {
  time: minutes * 60 + seconds,
  text: match[3].trim(),
};
      })
      .filter(Boolean);
  };

  const parsedLyrics = parseLyrics(currentSong?.originalLyrics);
  const parsedTranslated = parseLyrics(currentSong?.translatedLyrics);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);
    const loaded = () => setDuration(audio.duration || 1);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", loaded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", loaded);
    };
  }, [currentSong]);

  // 🔥 OPTIMIZED CENTER LOCK (runs only when line changes)
  const activeIndexRef = useRef(-1);

  useEffect(() => {
    const activeIndex = parsedLyrics.findLastIndex(
      (line) => currentTime >= line.time
    );

    if (
      activeIndex !== -1 &&
      activeIndex !== activeIndexRef.current &&
      lyricRefs.current[activeIndex] &&
      lyricsContainerRef.current
    ) {
      activeIndexRef.current = activeIndex;

      const container = lyricsContainerRef.current;
      const activeItem = lyricRefs.current[activeIndex];

      const scrollPos =
        activeItem.offsetTop -
        container.clientHeight / 2 +
        activeItem.clientHeight / 2;

      container.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    }
  }, [currentTime, parsedLyrics]);

  if (!currentSong) return null;

  return (
    <div style={styles.container}>
      {/* Background */}
      <div
        style={{
          ...styles.bg,
          backgroundImage: `url(${process.env.PUBLIC_URL + currentSong.image})`,
        }}
      />
      <div style={styles.overlay} />

      {/* Card */}
      <div style={styles.card}>
        <div style={styles.top}>
          <img
            src={process.env.PUBLIC_URL + currentSong.image}
            style={styles.cover}
            alt="album art"
          />
          <h1 style={styles.title}>{currentSong.songtitle}</h1>
          <p style={styles.artist}>{currentSong.artist}</p>
        </div>

        {/* Seek */}
        <div
          style={styles.seekBar}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            audioRef.current.currentTime =
              ((e.clientX - rect.left) / rect.width) * duration;
          }}
        >
          <div
            style={{
              ...styles.seekProgress,
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button
            style={styles.btn}
            onClick={() =>
              setCurrentIndex(Math.max(0, currentIndex - 1))
            }
          >
            ⏮
          </button>

          <button
            style={styles.playBtn}
            onClick={() => {
              if (isPlaying) audioRef.current.pause();
              else audioRef.current.play();
              setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            style={styles.btn}
            onClick={() =>
              setCurrentIndex(
                Math.min(songs.length - 1, currentIndex + 1)
              )
            }
          >
            ⏭
          </button>
        </div>

        <audio
          ref={audioRef}
          autoPlay
          src={process.env.PUBLIC_URL + currentSong.audiourl}
        />

        {/* 🎯 LYRICS */}
        <div ref={lyricsContainerRef} style={styles.lyricsWrapper}>
          <div style={styles.scrollArea}>
            {parsedLyrics.map((line, i) => {
              const next = parsedLyrics[i + 1];
              const active =
                currentTime >= line.time &&
                (!next || currentTime < next.time);

              return (
                <div
                  key={i}
                  ref={(el) => (lyricRefs.current[i] = el)}
                  style={{
                    ...styles.line,
                    opacity: active ? 1 : 0.12,
                    transform: active ? "scale(1.08)" : "scale(0.94)",
                    filter: active ? "blur(0px)" : "blur(2px)",
                  }}
                >
                  <div
                    style={{
                      ...styles.mainLine,
                      color: active ? "#ff4da6" : "#ffffff",
                    }}
                  >
                    {line.text}
                  </div>

                  {parsedTranslated[i] && (
                    <div
                      style={{
                        ...styles.subLine,
                        color: active ? "#ff4da6" : "#aaa",
                      }}
                    >
                      {parsedTranslated[i].text}
                    </div>
                  )}
                </div>
              );
            })}

            {/* spacer */}
            <div style={{ height: "40vh" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    filter: "blur(70px) brightness(0.25)",
    transform: "scale(1.3)",
    zIndex: -1,
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
  },

  card: {
    width: "95%",
    maxWidth: "420px",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    padding: "25px",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(25px)",
    overflow: "hidden",
  },

  top: { textAlign: "center" },

  cover: {
    width: "130px",
    height: "130px",
    borderRadius: "15px",
    objectFit: "cover",
  },

  title: {
    color: "#fff",
    fontSize: "22px",
    marginTop: "10px",
  },

  artist: {
    color: "#aaa",
    fontSize: "14px",
  },

  seekBar: {
    height: "5px",
    background: "rgba(255,255,255,0.1)",
    margin: "20px 0",
    cursor: "pointer",
  },

  seekProgress: {
    height: "100%",
    background: "#ff4da6",
  },

  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginBottom: "20px",
  },

  btn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
  },

  playBtn: {
    background: "#ff4da6",
    border: "none",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
  },

  // 🔥 PERFECT LYRICS
  lyricsWrapper: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
  },

  scrollArea: {
    paddingTop: "50vh",
  },

  line: {
    width: "80%",
    maxWidth: "500px",
    margin: "0 auto 28px",
    textAlign: "center",
    transition: "all 0.4s ease",
  },

 mainLine: {
  fontSize: "clamp(14px, 2vw, 20px)", // 👈 reduced from 26px
  fontWeight: "600",                  // 👈 slightly lighter (looks cleaner)
  lineHeight: "1.4",
},
 subLine: {
  fontSize: "clamp(10px, 1.4vw, 12px)", // 👈 reduced
  marginTop: "5px",
  opacity: 0.75,
}
}

export default PlayerPage;