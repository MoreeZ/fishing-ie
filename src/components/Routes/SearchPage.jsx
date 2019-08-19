import React, { useContext, useState, useEffect, useMemo } from "react";
import { locationsReducer } from "../../reducers/locationsReducer";
import LocationCard from "../Reusable/LocationCard";
import arrowDown from "../../assets/arrowDown.svg";
import arrowUp from "../../assets/arrowUp.svg";
import PageSelect from "../Reusable/PageSelect";
import SearchForm from "../Reusable/SearchBox";

const SearchPage = props => {
  const locationsPerPage = 9;
  const { locations } = useContext(locationsReducer).state;
  const [sortedLocations, setSortedLocations] = useState([]);
  const [sortMode, setSortMode] = useState("ascending");
  const [filtered, setFiltered] = useState([]);
  const path = props.match.path.match(/^\/[A-Z]*\//gi)[0];

  //scroll to top when a new page renders
  useEffect(() => window.scrollTo(0, 0), [props.match]);

  const objectToArray = object => {
    let arr = [];
    for (let key in object) {
      const mapId = { ...object[key], id: key };
      arr.push(mapId);
    }
    return arr;
  };

  useMemo(() => {
    const locationsArrray = objectToArray(locations);
    if (sortMode === "ascending") {
      setSortedLocations(
        locationsArrray.sort((a, b) => a.name.localeCompare(b.name))
      );
      setFiltered(locationsArrray.sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setSortedLocations(
        locationsArrray.sort((a, b) => b.name.localeCompare(a.name))
      );
      setFiltered(locationsArrray.sort((a, b) => b.name.localeCompare(a.name)));
    }
  }, [locations, sortMode]);

  const handleFilter = e => {
    const searchWords = e.target.value.toLowerCase();
    const searchLocations = [...sortedLocations].filter(location =>
      location.name.toLowerCase().includes(searchWords)
    );
    if (searchWords === "") {
      setFiltered(sortedLocations);
    } else {
      setFiltered(searchLocations);
    }
  };
  useEffect(() => {
    console.log("search page rendered");
  });
  const page = Number(props.match.params.page);
  const renderPage = () => {
    return (
      <div className="locations-page each-page-layout">
        <div className="responsive-cont">
          <div className="locations-text">
            <div className="locations-header">
              Explore all available surfing locations in Ireland
            </div>
            <div className="locaions-subheading">
              View our entire index of places to fish in Ireland
            </div>
          </div>
          <div className="search-container">
            <SearchForm handleFilter={handleFilter} />
          </div>
          <PageSelect
            page={page}
            locationsPerPage={locationsPerPage}
            path={path}
            locations={
              filtered.length > 0
                ? filtered
                : sortedLocations
                ? sortedLocations
                : locations
            }
          />
          <div className="locations-sorting">
            <div
              className="sort-name"
              onClick={() => {
                if (sortMode === "ascending") {
                  setSortMode("descending");
                } else {
                  setSortMode("ascending");
                }
              }}
            >
              <span>name</span>
              <img
                src={sortMode === "ascending" ? arrowDown : arrowUp}
                alt=""
              />
            </div>
          </div>
          {sortedLocations && (
            <div className="locations-render-space">
              {filtered.length > 0 ? (
                filtered.map((location, index) => {
                  if (
                    index < Number(page) * locationsPerPage &&
                    index >= (Number(page) - 1) * locationsPerPage
                  ) {
                    return <LocationCard key={location.id} info={location} />;
                  } else return null;
                })
              ) : filtered.length === 0 ? (
                <div>No Results found</div>
              ) : (
                sortedLocations.map((location, index) => {
                  if (
                    index < Number(page) * locationsPerPage &&
                    index >= (Number(page) - 1) * locationsPerPage
                  ) {
                    return <LocationCard key={location.id} info={location} />;
                  } else return null;
                })
              )}
            </div>
          )}
          <PageSelect
            page={page}
            locationsPerPage={locationsPerPage}
            path={path}
            locations={filtered.length > 0 ? filtered : sortedLocations}
          />
        </div>
      </div>
    );
  };
  return useMemo(renderPage, [locations, filtered, page]);
};

export default SearchPage;
