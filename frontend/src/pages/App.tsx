import { SearchBar, DisplayInfo } from "../components";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const Header = () => {
  return (
    <h1 style={{margin: "auto", fontFamily: "Roboto"}}>Phoebus</h1>
  )
}

const TopBar = () => {
  return (
        <SearchBar />
  )
}

export const App = () => {
  return (
    <div className="App" style={{ height: "100%", display: "flex", flexDirection: "column"}}>
      <Header />
      <Routes>
        <Route path="/" element={<><TopBar /><div style={{height: "65%"}}/></>} />
        <Route path="/search" element={<DisplayInfo />} />
      </Routes>
      <div className="mast">Jet Semrick | Will Thomas | HackKU 2022</div>
      <div>Disclaimer: No information here should be construed as financial advice. All data and predictions are for educational purposes, but more due diligence is required before you make an investment</div>
    </div>
  );
}