import React, { useEffect, useRef, useState } from "react";

function Lyrics({ song }) {
  const audioRef = useRef(null);
  const lyricsRefs = useRef([]);
  const containerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  // 🔁 Reset when song changes
  useEffect(() => {
    if (audioRef.current) audioRef.current.currentTime = 0;
    setCurrentTime(0);
    lyricsRefs.current = [];
  }, [song]);

  // ✅ FIXED PARSER (supports mm:ss and mm:ss.ms)
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

  // ✅ Parse once (important fix)
  const original = parseLyrics(song?.originalLyrics);
  const translated = parseLyrics(song?.translatedLyrics);

  const mergedLyrics = original.map((line, i) => ({
    ...line,
    translated: translated[i]?.text || "",
  }));

  // ⏱ Track audio time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  // 🎯 Auto scroll to active line
  useEffect(() => {
    const activeIndex = mergedLyrics.findLastIndex(
      (line) => currentTime >= line.time
    );

    if (
      activeIndex !== -1 &&
      lyricsRefs.current[activeIndex] &&
      containerRef.current
    ) {
      const container = containerRef.current;
      const activeLine = lyricsRefs.current[activeIndex];

      const scrollPos =
        activeLine.offsetTop -
        container.clientHeight / 2 +
        activeLine.clientHeight / 2;

      container.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      });
    }
  }, [currentTime, mergedLyrics]);

  if (!song)
    return <div style={{ color: "white" }}>Select a song 🎧</div>;

  return (
    <div style={styles.wrapper}>
      <audio
        ref={audioRef}
        controls
        autoPlay
        src={process.env.PUBLIC_URL + song.audiourl}
        style={styles.audio}
      />

      <div ref={containerRef} style={styles.lyricsBox}>
        <div style={styles.scrollArea}>
          {mergedLyrics.map((line, index) => {
            const nextLine = mergedLyrics[index + 1];

            const isActive =
              currentTime >= line.time &&
              (!nextLine || currentTime < nextLine.time);

            return (
              <div
                key={index}
                ref={(el) => (lyricsRefs.current[index] = el)}
                style={{
                  ...styles.line,
                  opacity: isActive ? 1 : 0.15,
                  transform: isActive ? "scale(1.08)" : "scale(0.92)",
                  filter: isActive ? "blur(0px)" : "blur(2px)",
                }}
              >
                <div
                  style={{
                    ...styles.originalText,
                    color: isActive ? "#ff4da6" : "#ffffff",
                  }}
                >
                  {line.text}
                </div>

                {line.translated && (
                  <div
                    style={{
                      ...styles.translationText,
                      color: isActive ? "#ff4da6" : "#aaa",
                    }}
                  >
                    {line.translated}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ height: "300px" }} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  audio: {
    width: "100%",
    marginTop: "10px",
    zIndex: 10,
  },

  lyricsBox: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    marginTop: "20px",
    position: "relative",

    WebkitMaskImage:
      "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
    maskImage:
      "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
  },

  scrollArea: {
    paddingTop: "45vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  line: {
    width: "80%",
    maxWidth: "600px",
    marginBottom: "32px",
    transition: "all 0.4s ease",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  originalText: {
    fontSize: "clamp(18px, 2.5vw, 26px)",
    fontWeight: "500",
    lineHeight: "1.5",
    wordBreak: "break-word",
  },

  translationText: {
    fontSize: "clamp(13px, 1.6vw, 16px)",
    marginTop: "6px",
    opacity: 0.8,
    lineHeight: "1.4",
    wordBreak: "break-word",
  },
};

export default Lyrics;