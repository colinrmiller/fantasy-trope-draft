import React from "react";
import { APIManager } from "../../modules/APIManager";
// import SearchBar from "material-ui-search-bar";
import { useState } from "react";

export const SearchBarComp = () => {
    const API = new APIManager();
    const [queryString, setQueryString] = useState("");

    // const onsubmit = (query) => {};

    return (
        <div className="searchBar">
            {/* <SearchBar
                value={queryString}
                onChange={(newValue) => setQueryString(newValue)}
                // onRequestSearch={() => doSomethingWith(queryString)}
            /> */}
            <div className="searchBar__display" display="none"></div>
        </div>
    );
};
