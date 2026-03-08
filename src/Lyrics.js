import React, { useEffect, useRef, useState } from "react";

function Lyrics({ song }) {

    const audioRef = useRef(null);
    const lyricsRefs = useRef([]);
    const [currentTime, setCurrentTime] = useState(0);

    // Reset when song changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        setCurrentTime(0);
    }, [song]);

    // Parse timestamp lyrics
    const parseLyrics = (lyrics) => {
        if (!lyrics) return [];

        return lyrics
            .split("\n")
            .map((line) => {
                const match = line.match(/\[(\d+):(\d+)\](.*)/);
                if (!match) return null;

                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);

                return {
                    time: minutes * 60 + seconds,
                    text: match[3].trim(),
                };
            })
            .filter(Boolean);
    };
    const originalParsed = parseLyrics(song ? song.originalLyrics : "");
    const translatedParsed = parseLyrics(song ? song.translatedLyrics : "");

    const mergedLyrics = originalParsed.map((line, index) => ({
        time: line.time,
        original: line.text,
        translated: translatedParsed[index] ?
            translatedParsed[index].text : "",
    }));


    // Track audio time
    useEffect(() => {
        const audio = audioRef.current;

        const update = () => {
            setCurrentTime(audio.currentTime);
        };

        if (audio) {
            audio.addEventListener("timeupdate", update);
        }

        return () => {
            if (audio) audio.removeEventListener("timeupdate", update);
        };
    }, []);


    // Auto-scroll active lyric
    useEffect(() => {

        mergedLyrics.forEach((line, index) => {

            let nextTime =
                index + 1 < mergedLyrics.length ?
                mergedLyrics[index + 1].time :
                Infinity;

            if (currentTime >= line.time && currentTime < nextTime) {

                const el = lyricsRefs.current[index];

                if (el) {
                    el.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

            }

        });

    }, [currentTime, mergedLyrics]);


    if (!song) return <div > Select a song🎧 < /div>;

    return ( <
        div >

        <
        audio ref = { audioRef }
        controls autoPlay src = { process.env.PUBLIC_URL + song.audiourl }
        style = {
            { marginTop: "20px" }
        }
        />

        <
        div style = {
            {
                height: "450px",
                overflowY: "auto",
                textAlign: "center",
                marginTop: "30px"
            }
        } >

        {
            mergedLyrics.map((line, index) => {

                let nextTime =
                    index + 1 < mergedLyrics.length ?
                    mergedLyrics[index + 1].time :
                    Infinity;

                const isActive =
                    currentTime >= line.time &&
                    currentTime < nextTime;

                return ( <
                    div key = { index }
                    ref = {
                        (el) => (lyricsRefs.current[index] = el)
                    }
                    style = {
                        { marginBottom: "20px" }
                    } >

                    { /* Original lyric */ } <
                    div style = {
                        {
                            color: isActive ? "#ff4da6" : "#555",
                            fontSize: isActive ? "28px" : "20px",
                            fontWeight: isActive ? "bold" : "normal",
                            textShadow: isActive ? "0px 0px 10px #ff4da6" : "none",
                            transition: "all 0.3s ease"
                        }
                    } > { line.original } <
                    /div>

                    { /* Translated lyric */ } {
                        line.translated && ( <
                            div style = {
                                {
                                    color: isActive ? "#ff99cc" : "#999",
                                    fontSize: "18px",
                                    marginTop: "5px"
                                }
                            } > { line.translated } <
                            /div>
                        )
                    }

                    <
                    /div>
                );
            })
        }

        <
        /div>

        <
        /div>
    );
}

export default Lyrics;