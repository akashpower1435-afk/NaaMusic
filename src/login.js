import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  // ✅ State
  const [listenerName, setListenerName] = useState("");
  const [secretPin, setSecretPin] = useState("");

  // ✅ Handle Login
  const handleLogin = async () => {
    console.log("Clicked");

    try {
      await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: listenerName,
          pin: secretPin
        })
      });
    } catch (error) {
      console.log("Error:", error);
    }

    // ✅ Navigate after login
    navigate("/languages");
  };

  return (
    <div style={styles.container}>

      {/* 🌌 Background */}
      <div style={styles.bg}></div>

      {/* 🌫 Overlay */}
      <div style={styles.overlay}></div>

      {/* 🔥 TOP TEXT */}
      <div style={styles.welcome}>Welcome Homie 🎧</div>

      {/* 💎 LOGIN CARD */}
      <div style={styles.card}>

        <h1 style={styles.title}>Music App</h1>

        <input
          placeholder="Listener Name"
          style={styles.input}
          value={listenerName}
          onChange={(e) => setListenerName(e.target.value)}
        />

        <input
          placeholder="Secret Pin"
          type="password"
          style={styles.input}
          value={secretPin}
          onChange={(e) => setSecretPin(e.target.value)}
        />

        <button onClick={handleLogin} style={styles.button}>
          Enter 🎶
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },

  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scale(1.1)",
    filter: "blur(6px) brightness(0.5)",
    animation: "zoom 20s infinite alternate ease-in-out"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9))"
  },

  welcome: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "22px",
    zIndex: 2,
    color: "#fff",
    letterSpacing: "1px",
    textShadow: "0 0 10px #00bfff, 0 0 20px #00bfff"
  },

  card: {
    zIndex: 2,
    width: "320px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 0 40px rgba(0,150,255,0.3)",
    textAlign: "center",
    animation: "fadeIn 1s ease"
  },

  title: {
    marginBottom: "20px",
    color: "#00bfff",
    textShadow: "0 0 15px #00bfff"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "14px"
  },

  button: {
    marginTop: "15px",
    padding: "12px",
    width: "100%",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(45deg, #00bfff, #007bff)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
    boxShadow: "0 0 15px #00bfff"
  }
};

export default Login;