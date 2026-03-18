import { HashRouter, Routes, Route } from "react-router-dom";
import Languages from "./language";
import SongList from "./SongList";
import PlayerPage from "./PlayerPage";
import Login from "./login";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/songs/:language" element={<SongList />} />
        <Route path="/player" element={<PlayerPage />} />
      </Routes>
    </HashRouter>
  );
}
export default App;