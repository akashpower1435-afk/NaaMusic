import React, { useRef, useState, useEffect } from "react";

function Lyrics({ song }) {

    const audioRef = useRef(null);
    const lyricsRefs = useRef([]);
    const [currentTime, setCurrentTime] = useState(0);

    // Reset time when song changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        setCurrentTime(0);
    }, [song && song.id]);

    // Parser
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

    const originalParsed = parseLyrics(song && song.originalLyrics ? song.originalLyrics : "");
    const translatedParsed = parseLyrics(song && song.translatedLyrics ? song.translatedLyrics : "");

    const mergedLyrics = originalParsed.map((line, index) => ({
        time: line.time,
        original: line.text,
        translated: translatedParsed[index] ?
            translatedParsed[index].text : "",
    }));


    // 🔥 Auto scroll effect
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


    // 🔥 Now returns AFTER hooks
    if (!song) return null;
    if (!song.originalLyrics) return <div > No lyrics available < /div>;

    return ( <
        div >

        <
        audio ref = { audioRef }
        src = { `http://localhost:2855${song.audiourl}` }
        controls autoPlay onTimeUpdate = {
            () =>
            setCurrentTime(audioRef.current.currentTime)
        }
        />

        <
        div style = {
            {
                height: "400px",
                overflowY: "auto",
                textAlign: "center",
                marginTop: "20px"
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
                        { marginBottom: "18px" }
                    } >

                    <
                    div style = {
                        {
                            color: isActive ? "#ff4da6" : "#555",
                            fontSize: isActive ? "28px" : "20px",
                            fontWeight: isActive ? "bold" : "normal",
                            transition: "0.3s",
                        }
                    } > { line.original } <
                    /div>

                    {
                        line.translated && ( <
                            div style = {
                                {
                                    color: isActive ? "#ff99cc" : "#999",
                                    fontSize: "18px",
                                    marginTop: "4px",
                                }
                            } > { line.translated } <
                            /div>
                        )
                    }

                    <
                    /div>
                );
            })
        } <
        /div>

        <
        /div>
    );
}

export default Lyrics;