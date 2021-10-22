import React from "react";
import { SearchBar } from "./SearchBar";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { FilmFeed } from "../home/FilmFeed";

export const Search = () => {
    const API = new APIManager();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        API.getFilmSearch(searchQuery).then((res) => {
            if (res?.results) setSearchResults(res.results);
            else setSearchResults([]);
        });
    }, [searchQuery]);

    return (
        <div className="search">
            <h3> Search </h3>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSubmit}
            />
            <FilmFeed filmList={searchResults} header="" />
        </div>
    );
};
