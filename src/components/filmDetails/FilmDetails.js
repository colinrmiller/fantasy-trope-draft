import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { APIManager } from "../../modules/APIManager";
import "./FilmDetails.css";
import AddIcon from "@mui/icons-material/Add";
import { StarRating } from "../utilities/StarRating";
import { FilmCardLarge } from "../cards/FilmCardLarge";
import { TagList } from "../TagList/TagList";
import { CommentFeed } from "../comments/CommentFeed";
import { CommentCard } from "../cards/CommentCard";
import { FilmFeed } from "../home/FilmFeed";
// import { FBLogin } from "../utilities/FBLogin";
import { FaceBookLogin } from "../auth/FaceBookLogin";
// import {}

// import { GithubLogin } from "../auth/GithubLogin";

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

    // State Handeling for Video-Embed
    const [videoId, setVideoId] = useState("");
    const getVideo = () => {
        API.getVideo(filmId).then((res) => setVideoId(res));
    };
    useEffect(() => {
        getVideo();
    }, [film]);

    // State Handeling for Film Recomendations
    const [similarFilmList, setSimilarFilmList] = useState([]);
    const getSimilar = () => {
        API.getSimilar(filmId).then((res) => setSimilarFilmList(res));
    };
    useEffect(() => {
        getSimilar();
    }, [film]);

    return (
        <div className="filmDetails">
            {/* <FaceBookLogin /> */}
            {/* <GithubLogin /> */}
            <div className="filmDetails__head">
                <div className="filmDetails__head--img">
                    <div className="img-container">
                        {/* <img
                            src={filmPoster}
                            alt={film?.title + " Poster"}
                            className="img"
                        /> */}
                        <FilmCardLarge film={film} />

                        <StarRating handleRating={() => {}} />

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
                        <p className="filmDetails__tagline">
                            <strong>{film.tagline}</strong>
                        </p>

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
            {videoId !== "" && videoId ? (
                <>
                    <hr />
                    <div className="filmDetails__video">
                        <iframe
                            width="400"
                            height="225"
                            src={"https://www.youtube.com/embed/" + videoId}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <hr />
                </>
            ) : null}

            <div className="filmDetails__similar">
                <FilmFeed filmList={similarFilmList} header="more like this" />
            </div>

            <div className="filmDetails__CommentFeed">
                <CommentFeed filmId={filmId} />
            </div>
        </div>
    );
};
