import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { APIManager } from "../../modules/APIManager";
import "./FilmDetails.css";
import AddIcon from "@mui/icons-material/Add";
import { StarRating } from "../utilities/StarRating";
import { FilmCardLarge } from "../cards/FilmCardLarge";
import { TagList } from "../TagList/TagList";

export const FilmDetails = () => {
    const [film, setFilm] = useState({});
    const [filmPoster, setFilmPoster] = useState("");
    const { filmId } = useParams();
    const API = new APIManager();

    const dateToYear = (dateString) => {
        if (dateString) {
            if (dateString.length > 0) {
                return dateString.slice(0, 4);
            } else return dateString;
        } else return dateString;
    };
    useEffect(() => {
        API.getFilm(filmId).then((res) => setFilm(res));
    }, []);

    useEffect(() => {
        let basePath = "https://image.tmdb.org/t/p/original";
        setFilmPoster(basePath + film?.poster_path);
    }, [film]);

    return (
        <div className="filmDetails">
            <div className="filmDetails__head">
                <div className="filmDetails__head--img">
                    <div className="img-container">
                        {/* <img
                            src={filmPoster}
                            alt={film?.title + " Poster"}
                            className="img"
                        /> */}
                        <FilmCardLarge film={film} />

                        <StarRating />
                        {/* <div className="img__addButton">
                            <p className="addButton__container">Add Film</p>
                            <AddIcon />
                        </div> */}
                    </div>
                </div>
                <div className="filmDetails__head--content">
                    <div className="content__head">
                        <div className="content__title">{film?.title}</div>
                        <div className="content__date">
                            {dateToYear(film?.release_date)}
                        </div>
                    </div>
                    <div className="content__body">
                        <div className="content__synopsis">
                            {film?.overview}
                        </div>
                        <div className="content__cast"></div>
                        <div className="content__tags">
                            <TagList filmId={film?.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
