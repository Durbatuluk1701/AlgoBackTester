import { SearchBar, DisplayInfo } from "../components";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const TopBar = () => {
  return (
        <SearchBar />
  )
}

export const App = () => {
  return (
    <div className="App" style={{ height: "100%"}}>
      <Routes>
        <Route path="/" element={<TopBar />} />
        <Route path="/search" element={<DisplayInfo />} />
      </Routes>
      <div className="mast">Jet Semrick | Will Thomas | HackKU 2022</div>
    </div>
  );
}