import React, { useEffect, useState } from "react";

function SongList({ onSelect }) {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/data/songs.json")
            .then(res => res.json())
            .then(data => setSongs(data))
            .catch(err => console.error(err));
    }, []);

    return ( <
        div >
        <
        h2 > Songs < /h2>

        {
            songs.map((song) => ( <
                div key = { song.id }
                onClick = {
                    () => {
                        console.log("Clicked:", song);
                        onSelect(song);
                    }
                }
                style = {
                    { cursor: "pointer", padding: "10px", color: "white" }
                } > { song.songtitle } - { song.artist } <
                /div>
            ))
        } <
        /div>
    );

}

export default SongList;