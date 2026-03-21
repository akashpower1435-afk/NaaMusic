import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Languages.css";

function Languages() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // 🔥 NEW

  const languages = [
    {
      name: "Telugu",
      img: process.env.PUBLIC_URL + "/images/telugu.jpg",
      position: "top-left",
    },
    {
      name: "English",
      img: process.env.PUBLIC_URL + "/images/english.jpg",
      position: "top-right",
    },
    {
      name: "Tamil",
      img: process.env.PUBLIC_URL + "/images/tamil.jpg",
      position: "center",
    },
    {
      name: "Hindi",
      img: process.env.PUBLIC_URL + "/images/hindi.jpg",
      position: "bottom-left",
    },
    {
      name: "Malayalam",
      img: process.env.PUBLIC_URL + "/images/malayalam.jpg",
      position: "bottom-right",
    },
  ];

  return (
    <div className="language-page">

      <div className="bg-image"></div>
      <div className="overlay"></div>

      <h1 className="title">Select Language 🎧</h1>

      <div className="language-container">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className={`language-card ${lang.position}`}
            onClick={() => setSelected(lang)}  // 🔥 CHANGED
          >
            <div className="card-inner">
              <img src={lang.img} alt={lang.name} />
              <div className="card-text">{lang.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 POPUP */}
      {selected && (
        <div className="popup-overlay" onClick={() => setSelected(null)}>
          <div
            className="popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.img} alt={selected.name} />

            <h2>{selected.name}</h2>

            <div className="popup-buttons">
              <button
                className="play-btn"
                onClick={() => navigate(`/songs/${selected.name}`)}
              >
                ▶ Play
              </button>

              <button
                className="close-btn"
                onClick={() => setSelected(null)}
              >
                ✖ Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Languages;