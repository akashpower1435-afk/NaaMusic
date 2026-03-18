import React from "react";
import { useNavigate } from "react-router-dom";
import "./Languages.css";

function Languages() {
  const navigate = useNavigate();

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
    <div
      className="language-page"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/1200x/e0/ed/33/e0ed332ceb372c8d482b7f7244091a17.jpg)",
      }}
    >
      <h1 className="title">Select Language 🎧</h1>

      <div className="language-container">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className={`language-card ${lang.position}`}
            onClick={() => navigate(`/songs/${lang.name}`)}
          >
            <div className="card-inner">
              <img src={lang.img} alt={lang.name} />
              <div className="card-text">{lang.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;