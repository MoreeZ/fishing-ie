import React, { useState, useEffect, useMemo } from "react";
import arrowLeft from "../../assets/arrowLeft.svg";
import arrowRight from "../../assets/arrowRight.svg";
import { NavLink, Redirect } from "react-router-dom";

const PageSelect = props => {
  const { locations } = props;
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const { locationsPerPage } = props;
    let pageNum = [];
    let number = 1;
    let index = 0;
    for (let id in locations) {
      if (id && (index / locationsPerPage) % 1 === 0) {
        pageNum.push(number);
        number++;
      }
      index++;
    }
    setPageNumbers(pageNum);
  }, [locations, props]);

  const { path, page } = props;

  const renderPageNumbers = pageNumbers => {
    return pageNumbers.map(num => (
      <NavLink to={`${path}${num}`} activeClassName="active-page" key={num}>
        {num}
      </NavLink>
    ));
  };
  useEffect(() => {
    console.log(pageNumbers.length, page);
  });
  const renderComponent = () => {
    return (
      <div className="page-select">
        <NavLink to={`${path}${page <= 1 ? page : page - 1}`}>
          <img src={arrowLeft} alt="" className="left-arrow" />
        </NavLink>
        <div className="page-numbers">{renderPageNumbers(pageNumbers)}</div>
        <NavLink to={`${path}${page === pageNumbers.length ? page : page + 1}`}>
          <img src={arrowRight} alt="" className="right-arrow" />
        </NavLink>
        {pageNumbers.length < page &&
          (pageNumbers.length !== 0 && (
            <Redirect to={`/search/${pageNumbers.length}`} />
          ))}
      </div>
    );
  };
  return useMemo(renderComponent, [pageNumbers]);
};

export default PageSelect;
