import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { APIManager } from "../../modules/APIManager";
import "./FilmDetails.css";
import AddIcon from "@mui/icons-material/Add";
import { StarRating } from "../utilities/StarRating";
import { FilmCardDetails } from "../cards/FilmCardDetails";
import { TagList } from "../TagList/TagList";
import { CommentFeed } from "../comments/CommentFeed";
import { CommentCard } from "../cards/CommentCard";
import { FilmFeed } from "../home/FilmFeed";
// import { FBLogin } from "../utilities/FBLogin";
import { FaceBookLogin } from "../auth/FaceBookLogin";
import { AddRemoveFilm } from "../utilities/AddRemoveFilm";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FilmRating } from "../utilities/FilmRating.js";
import { FilmTotalRating } from "../utilities/FilmTotalRating.js";
// import {}

// import { GithubLogin } from "../auth/GithubLogin";

export const FilmDetails = () => {
    const [film, setFilm] = useState({});
    const [filmPoster, setFilmPoster] = useState("");
    const [filmBackground, setFilmBackground] = useState("");
    const [filmLoaded, setFilmLoaded] = useState(false);

    const [filmVideos, setFilmVideos] = useState([]);
    const [videoIndex, setVideoIndex] = useState(0);

    const [userRating, setUserRating] = useState(null);
    const [totalRating, setTotalRating] = useState(null);
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const { filmId } = useParams();
    const API = new APIManager();

    const dateToYear = (dateString) => {
        if (dateString) {
            if (dateString.length > 0) {
                return dateString.slice(0, 4);
            } else return dateString;
        } else return dateString;
    };

    const getUserRating = () => {
        API.getUserFilmRating(currentUser, filmId).then((res) => {
            if (res.length > 0) {
                setUserRating(res[0].rating);
            }
        });
    };
    const getTotalRating = () => {
        API.getTotalFilmRating(filmId).then((res) => {
            if (res.length > 0) {
                let totalScore = 0;
                res.forEach((resObj) => {
                    totalScore += resObj.rating;
                });
                const totalRatingsObj = {
                    rating: totalScore / res.length,
                    numberOfRatings: res.length,
                };
                setTotalRating(totalRatingsObj);
            }
        });
    };

    const putUserRating = (newRating) => {
        API.setUserFilmRating(currentUser, filmId, newRating).then(() => {
            getUserRating();
        });
    };

    // const getUserRating
    useEffect(() => {
        getUserRating();
        getTotalRating();
        setFilmLoaded(false);
    }, []);

    useEffect(() => {
        setFilmLoaded(false);
        API.getFilm(filmId).then((res) => {
            setFilm(res);
            setFilmLoaded(true);
        });
    }, [filmId]);

    useEffect(() => {
        const head = document.getElementsByClassName("filmDetails__head");
        if (head) {
            head[0].style.width = "100%";
            // head[0].style.display = "table";
            head[0].style.background =
                "linear-gradient( rgba(28, 34, 41, 0.4), rgba(28, 34, 41, 0.5), rgba(28, 34, 41, 0.6), rgba(28, 34, 41, .7), rgba(28, 34, 41, 0.8), rgba(28, 34, 41, 0.9), rgba(28, 34, 41, 0.9), rgba(28, 34, 41, 1)  )," +
                "url('https://image.tmdb.org/t/p/original" +
                film.backdrop_path +
                "')";
            head[0].style.backgroundPosition = "center top";
        }
    }, [filmLoaded]);

    // State Handeling for Video-Embed
    const [videoId, setVideoId] = useState("");
    const getVideo = () => {
        API.getVideo(filmId, videoIndex).then((res) => setVideoId(res));
    };

    const getVideos = () => {
        API.getVideos(filmId).then((res) => setFilmVideos(res));
    };

    useEffect(() => {
        getVideos();
    }, [film]);

    useEffect(() => {
        getVideo(videoIndex);
    }, [film, videoIndex]);

    const handleVideoSwitch = (direction) => {
        const videoArrayLength = filmVideos.length;
        let newIndex;
        switch (direction) {
            case "forward":
                newIndex =
                    (videoArrayLength + videoIndex + 1) % videoArrayLength;
                setVideoIndex(newIndex);
                break;
            case "backward":
                newIndex =
                    (videoArrayLength + videoIndex - 1) % videoArrayLength;
                setVideoIndex(newIndex);

                break;
            default:
                break;
        }
    };

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
                        <FilmCardDetails film={film} expand />
                        <div className="filmCardDetails__holder">
                            <StarRating
                                userRating={userRating}
                                handleRating={(newValue) =>
                                    putUserRating(newValue)
                                }
                            />
                            <AddRemoveFilm film={film} />
                            <FilmTotalRating film={film} />
                            <FilmRating
                                rating={totalRating?.rating}
                                numberOfRatings={totalRating?.numberOfRatings}
                            />
                        </div>

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
                        <ArrowBackIosNewIcon
                            className="filmDetails__video--arrow"
                            onClick={() => handleVideoSwitch("backward")}
                        />
                        <iframe
                            width="400"
                            height="225"
                            src={"https://www.youtube.com/embed/" + videoId}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <ArrowForwardIosIcon
                            className="filmDetails__video--arrow"
                            onClick={() => handleVideoSwitch("forward")}
                        />
                    </div>
                    {/* <hr /> */}
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
