import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/languages");
  };

  return (
    <div style={styles.container}>

      {/* 🔥 TOP LEFT TEXT */}
      <div style={styles.welcome}>Welcome Homie 🎧</div>

      {/* 🎧 LOGIN CARD */}
      <div style={styles.card}>

        <h1 style={styles.title}>Music App</h1>

        <input
          placeholder="Listener Name"
          style={styles.input}
        />

        <input
          placeholder="Secret Pin"
          type="password"
          style={styles.input}
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
    background: "radial-gradient(circle at top, #001a2e, #000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    color: "white"
  },

  welcome: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "22px",
    color: "#fff",
    textShadow: "0 0 8px #fff, 0 0 15px #00bfff"
  },

  card: {
    width: "300px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 25px rgba(0,150,255,0.3)",
    textAlign: "center"
  },

  title: {
    marginBottom: "20px",
    color: "#00bfff",
    textShadow: "0 0 10px #00bfff"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white"
  },

  button: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #00bfff, #007bff)",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 0 10px #00bfff"
  }
};

export default Login;