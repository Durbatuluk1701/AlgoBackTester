import "./SearchBar.css";
import React, { useState, useEffect } from "react";

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

  /* Conditional Styling for API Calls */
  const [isCallSuccess, setIsCallSuccess] = useState(false);

  const handleAPICall = () => {
    setIsCallSuccess(!isCallSuccess);
  };

  useEffect(() => {
    console.log(isCallSuccess);
  }, [isCallSuccess]);

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
        <input
          className="submit"
          type="submit"
          value="Retrieve Data"
          onClick={handleAPICall}
        />
      </form>
    </div>
  );
};
