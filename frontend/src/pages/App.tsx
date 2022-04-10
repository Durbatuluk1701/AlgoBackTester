import { SearchBar, DisplayInfo } from "../components";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

const Header = () => {
  let navigate = useNavigate();

  const titleClickHandler = (event: any) => {
    setTimeout(function() {
      navigate("/");
    }, 500);
  };

  return (
    <div
      style={{
        margin: "auto",
        fontFamily: "Roboto",
        fontWeight: "900",
        color: "#7cb896",
        fontSize: "75px"
      }}
      onClick={titleClickHandler}
    >
      PHOEBUS
    </div>
  );
};

const TopBar = () => {
  return <SearchBar />;
};

export const App = () => {
  return (
    <div
      className="App"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopBar />
              <div style={{ height: "65%" }} />
            </>
          }
        />
        <Route path="/search" element={<DisplayInfo />} />
      </Routes>
      <div className="mast">Jet Semrick | Will Thomas | HackKU 2022</div>
      <div>
        Disclaimer: No information here should be construed as financial advice.
        All data and predictions are for educational purposes, but more due
        diligence is required before you make an investment
      </div>
    </div>
  );
};
