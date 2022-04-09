import "./SearchBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  /* Ticker Input */
  const [value, setValue] = useState({
    ticker: ""
  });

  const handleTickerEnter = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValue(value => ({
      ticker: event.target.value
    }));
    console.log(value.ticker);
  };

  /* Submit Button */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    /* Make API Call */
    console.log(value.ticker);
    event.preventDefault();
  };

  let isCallSuccess = true

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
        />
        <Link
          to={`/search?ticker=${value.ticker}`}
          className="submit"
        >Search</Link>
      </form>
    </div>
  );
};
