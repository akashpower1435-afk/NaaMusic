import React, { useEffect, useState } from "react";

function SongList({ onSelect }) {
    const [songs, setSongs] = useState([]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        fetch("http://localhost:2855/api/music")
            .then((res) => res.json())
            .then((data) => setSongs(data))
            .catch((err) => console.error(err));

    }, []);

    return ( <
        div style = {
            {
                width: "250px",
                backgroundColor: "#000",
                padding: "20px",
                height: "100vh",
                overflowY: "auto",
            }
        } > {
            songs.map((song) => ( <
                div key = { song.id }
                onClick = {
                    () => {
                        setActive(song.id);
                        onSelect(song);
                    }
                }
                style = {
                    {
                        padding: "12px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: active === song.id ? "#ff4da6" : "#111",
                        color: active === song.id ? "#000" : "#ff4da6",
                        fontWeight: "bold",
                        transition: "0.3s",
                    }
                } > { song.songtitle } <
                /div>
            ))
        } <
        /div>
    );
}

export default SongList;