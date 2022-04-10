import "./SearchBar.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  /* Ticker Input */
  const [value, setValue] = useState({
    ticker: ""
  });

  const handleTickerEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value => ({
      ticker: event.target.value
    }));
  };

  /* Submit Button */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    /* Make API Call */
    event.preventDefault();
  };

  let isCallSuccess = true;
  let navigate = useNavigate();

  const handleKey = (event: any) => {
    if (event.key === "Enter") {
      navigate(`/search?ticker=${value.ticker}`);
    }
  };

  return (
    <div className={`container-${isCallSuccess ? "data" : "home"}`}>
      <div className={`title-${isCallSuccess ? "data" : "home"}`}>PHOEBUS</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          type="text"
          placeholder="Enter Ticker"
          value={value.ticker}
          onChange={handleTickerEnter}
          onKeyPress={handleKey}
        />
        <Link to={`/search?ticker=${value.ticker}`} className="submit">
          Search
        </Link>
      </form>
    </div>
  );
};
