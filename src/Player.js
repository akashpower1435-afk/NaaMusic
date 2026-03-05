import React from "react";

function Player({ song }) {
    if (!song) return null;

    return ( <
        div style = {
            { marginTop: "20px", backgroundColor: "black" } } >
        <
        h2 > { " " } { song.songtitle } - { song.artist } { " " } <
        /h2> {
            song.audiourl ? ( <
                audio controls src = { song.audiourl }
                />
            ) : ( <
                p > ⚠No audio available < /p>
            )
        } { " " } <
        /div>
    );
}

export default Player;