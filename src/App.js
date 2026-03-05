import React, { useState } from "react";
import SongList from "./SongList";
import Lyrics from "./Lyrics";

function App() {
    const [selectedSong, setSelectedSong] = useState(null);

    return ( <
        div style = { styles.container } >
        <
        div style = { styles.sidebar } >
        <
        h2 style = {
            { color: "#1db954" } } > 🎵Songs < /h2>{" "} <
        SongList onSelect = { setSelectedSong }
        />{" "} <
        /div>{" "} <
        div style = { styles.main } >
        <
        h1 style = {
            { textAlign: "center" } } > Music Lyrics App < /h1>{" "} {
            selectedSong ? ( <
                Lyrics song = { selectedSong }
                />
            ) : ( <
                p style = {
                    { textAlign: "center", marginTop: "50px" } } >
                Select a song to play🎧 { " " } <
                /p>
            )
        } { " " } <
        /div>{" "} <
        /div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        backgroundColor: "#121212",
        color: "white",
        fontFamily: "Arial",
    },
    sidebar: {
        width: "25%",
        padding: "20px",
        borderRight: "1px solid #333",
        overflowY: "auto",
    },
    main: {
        width: "75%",
        padding: "30px",
        overflowY: "auto",
    },
};

export default App;