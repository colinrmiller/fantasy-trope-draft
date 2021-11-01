import React from "react";
import { SearchBar } from "./SearchBarTest.js";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { SearchFilmFeed } from "../home/SearchFilmFeed";

export const Search = () => {
    const API = new APIManager();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchActive, setSearchActive] = useState(false);
    const handleSubmit = (event, query) => {
        event.preventDefault();
        setSearchQuery(query);
        setSearchActive(true);
    };

    useEffect(() => {
        API.getFilmSearch(searchQuery).then((res) => {
            if (res?.results) setSearchResults(res.results);
            else setSearchResults([]);
        });
    }, [searchActive]);

    return (
        <div className="search">
            {/* <h3> Search </h3> */}
            <SearchBar
                // searchQuery={searchQuery}
                // setSearchQuery={setSearchQuery}
                handleSubmit={handleSubmit}
            />
            {searchActive ? (
                <SearchFilmFeed filmList={searchResults} header="" />
            ) : null}
        </div>
    );
};
