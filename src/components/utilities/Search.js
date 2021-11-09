import React from "react";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { SearchFilmFeed } from "../home/SearchFilmFeed";

export const Search = ({
    searchQuery,
    setSearchQuery,
    searchActive,
    setSearchActive,
}) => {
    const API = new APIManager();
    const [searchResults, setSearchResults] = useState([]);

    const handleClose = () => {
        setSearchActive(false);
        setSearchQuery = "";
    };

    useEffect(() => {
        API.getFilmSearch(searchQuery).then((res) => {
            if (res?.results) setSearchResults(res.results);
            else setSearchResults([]);
        });
    }, [searchActive]);

    return (
        <div className="search">
            {searchActive ? (
                <SearchFilmFeed
                    filmList={searchResults}
                    searchQuery={searchQuery}
                    handleClose={handleClose}
                    header=""
                />
            ) : null}
        </div>
    );
};
