import React from "react";
import search from "../../assets/search.svg";

const SearchForm = props => {
  return (
    <div className="search-form">
      <input type="text" onChange={props.handleFilter} required />
      <div className="effects">
        <div className="input-underline" />
        <span className="search-label">
          <img src={search} alt="" />
          <span>Search</span>
        </span>
      </div>
    </div>
  );
};

export default SearchForm;
