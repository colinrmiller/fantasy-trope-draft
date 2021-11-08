import { tmdb } from "./keys.js";
import { CommentAPIManager } from "./CommentAPIManager.js";
const remoteURL = "http://localhost:8088";

export class APIManager {
    getFriends = () => {
        const currentUserId = parseInt(sessionStorage.getItem("active_user"));
        return fetch(
            `http://localhost:8088/friends?currentUserId=${currentUserId}&_expand=user`
        ).then((result) => result.json());
    };

    // getFilmsByIdArray = (filmIdArray) => {
    //     const queryString = "?";

    //     filmIdArray.forEach((filmId) => {
    //         queryString += `filmId=${filmId}&`;
    //     });
    //     return fetch();
    // };

    getFilm = (filmId) => {
        return fetch(
            `https://api.themoviedb.org/3/movie/${filmId}?api_key=${tmdb}`
        ).then((res) => res.json());
    };

    getPopular = () => {
        return fetch(
            `
            https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=2&adult=false&api_key=${tmdb}`
        ).then((res) => res.json());
        // const apiString = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb}`;
        // return fetch(apiString).then((res) => res.json());
    };

    getLeastPopular = () => {
        return fetch(
            `
            https://api.themoviedb.org/3/discover/movie?sort_by=popularity.asc&api_key=${tmdb}`
        )
            .then((res) => res.json())
            .then((res) => {
                return res.results.filter((film) => {
                    const bool = film.poster_path && !film.adult;
                    return bool;
                });
            });
        // const apiString = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb}`;
        // return fetch(apiString).then((res) => res.json());
    };

    getInTheaters = () => {
        const oneWeekMilliSec = 604800000;
        let today = new Date();
        const fiveWeeksAgo = new Date(today - oneWeekMilliSec * 5);
        const end = today.toISOString().split("T")[0];

        const start = fiveWeeksAgo.toISOString().split("T")[0];
        // const apiString = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb}`;
        const apiString = `https://api.themoviedb.org/3/discover/movie/?primary_release_date.gte=${start}&primary_release_date.lte=${end}&api_key=${tmdb}`;
        return fetch(apiString)
            .then((res) => {
                return res.json();
            })
            .catch((error) => {
                return [];
            });
    };

    getUser = (userId) => {
        return fetch(`${remoteURL}/users/${userId}`).then((res) => res.json());
    };

    getUserFilmIds = (userId) => {
        return fetch(`${remoteURL}/usersFilms?userId=${userId}`).then((res) =>
            res.json()
        );
        // .then((usersFilms) => usersFilms.map((userFilm) => userFilm.film));
    };

    getUserFilm = (userId, filmId) => {
        return fetch(
            `${remoteURL}/usersFilms?userId=${userId}&filmId=${filmId}`
        ).then((res) => res.json());
    };

    addFilm(userId, filmId) {
        const newEntry = { userId: userId, filmId: filmId };
        return fetch(`${remoteURL}/usersFilms/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        }).then((response) => response.json());
    }

    deleteFilm(userId, filmId) {
        let usersFilmsId;
        return fetch(
            `${remoteURL}/usersFilms/?userId=${userId}&filmId=${filmId}`
        )
            .then((res) => res.json())
            .then((userFilmObj) => {
                usersFilmsId = userFilmObj[0].id;
            })
            .then(() => {
                const url = `${remoteURL}/usersFilms/${usersFilmsId}`;
                return fetch(url, {
                    method: "DELETE",
                }).then((response) => response.json());
            });
    }

    getAllFilmsByIdArray = (filmIds) => {
        if (filmIds.length > 0) {
            const promiseArray = filmIds.reduce((partialArray, filmId) => {
                partialArray.push(this.getFilm(filmId));
                return partialArray;
            }, []);
            const res = Promise.all(promiseArray);
            return res;
        } else return Promise.all([]);
    };

    putFilmNames = (filmObjArray) => {
        if (filmObjArray.length > 0) {
            const promiseArray = filmObjArray.reduce((partialArray, filmId) => {
                partialArray.push(this.getFilm(filmId["filmId"]));
                return partialArray;
            }, []);
            const res = Promise.all(promiseArray).then((result) => {
                return result.map((resultObj, index) => {
                    return {
                        filmName: resultObj.title,
                        filmId: filmObjArray[index]["filmId"],
                        valuation: filmObjArray[index]["valuation"],
                        index: filmObjArray[index]["index"],
                    };
                });
            });
            return res;
        } else return Promise.all([]);
    };

    getFilmSearch = (searchQuery) => {
        return fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${tmdb}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        ).then((res) => res.json());
    };

    getVideo = (filmId) => {
        return fetch(
            `https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${tmdb}&language=en-US
            `
        )
            .then((res) => res.json())
            .then((res) => res?.results[0]?.key);
    };

    getSimilar = (filmId) => {
        return fetch(
            `https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=${tmdb}&language=en-US
            `
        )
            .then((res) => res.json())
            .then((res) => res?.results);
    };

    getUserFriend = (userId, friendId) => {
        return fetch(
            `${remoteURL}/usersFriends/?currentUserId=${userId}&userId=${friendId}`
        ).then((res) => res.json());
    };

    addUserFriend = (userId, friendId) => {
        const newEntry = {
            currentUserId: userId,
            userId: friendId,
        };
        return fetch(
            `${remoteURL}/usersFriends/?currentUserId=${userId}&userId=${friendId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEntry),
            }
        ).then((res) => res.json());
    };

    deleteUserFriend = (userId, friendId) => {
        return this.getUserFriend(userId, friendId).then((userFriend) => {
            return fetch(`${remoteURL}/usersFriends/${userFriend[0].id}`, {
                method: "DELETE",
            });
        });
    };

    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------
    // ----------------------- Pairwise Comparison --------------------------------
    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------

    CommentAPI = new CommentAPIManager();

    getActiveFilms = () => {
        let activeFilms = [];

        return fetch(`${remoteURL}/usersFilmsTags`)
            .then((res) => res.json())
            .then((res) =>
                res.map((userFilmTag) => {
                    return userFilmTag.filmId;
                })
            )
            .then((filmIds) => {
                return filmIds.flatMap((filmId) => {
                    if (!activeFilms.includes(filmId)) {
                        activeFilms = [...activeFilms, filmId];
                        return [filmId];
                    } else return [];
                });
            });
    };

    getRandomFilm = () => {
        return this.getActiveFilms().then((filmIds) => {
            const randomId = Math.floor(filmIds.length * Math.random());

            return this.getFilm(filmIds[randomId]);
        });
    };

    getUserFilmChoice = (filmIdA, filmIdB, userId) => {
        return fetch(
            `${remoteURL}/userComparisons?plusFilmId=${filmIdA}&plusFilmId=${filmIdB}&minusFilmId=${filmIdA}&minusFilmId=${filmIdB}&userId=${userId}`
        ).then((response) => response.json());
    };

    getFilmChoices = (filmIdA, filmIdB) => {
        return fetch(
            `${remoteURL}/userComparisons?plusFilmId=${filmIdA}&plusFilmId=${filmIdB}&minusFilmId=${filmIdA}&minusFilmId=${filmIdB}`
        ).then((response) => response.json());
    };

    deleteUserFilmChoice = (choiceId) => {
        return fetch(`${remoteURL}/userComparisons/${choiceId}`, {
            method: "DELETE",
        }).then((response) => response.json());
    };

    addUserFilmChoice = (userId, filmA, filmB, choice) => {
        const filmChoice = {
            userId: userId,
        };
        switch (choice) {
            case "A":
                filmChoice["plusFilmId"] = filmA;
                filmChoice["minusFilmId"] = filmB;
                break;
            case "B":
                filmChoice["minusFilmId"] = filmA;
                filmChoice["plusFilmId"] = filmB;
                break;
            default:
                return Error;
        }
        return fetch(`${remoteURL}/userComparisons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filmChoice),
        }).then((response) => response.json());
    };

    putUserFilmChoice = (oldChoice, filmA, filmB, choice) => {
        const newChoice = { ...oldChoice };
        switch (choice) {
            case "A":
                newChoice["plusFilmId"] = filmA;
                newChoice["minusFilmId"] = filmB;
                break;
            case "B":
                newChoice["minusFilmId"] = filmA;
                newChoice["plusFilmId"] = filmB;
                break;
            default:
                return Error;
        }
        return fetch(`${remoteURL}/userComparisons/${newChoice.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newChoice),
        }).then((response) => response.json());
    };

    updateUserFilmChoice = (userId, filmA, filmB, choice) => {
        return this.getUserFilmChoice(filmA, filmB, userId).then((res) => {
            return this.putUserFilmChoice(res[0], filmA, filmB, choice);
        });
    };

    getRatedFilmPairs = (userId) => {
        return fetch(`${remoteURL}/userComparisons?userId=${userId}`).then(
            (res) => res.json()
        );
    };

    getStarredFilmComparisons = () => {
        return fetch(`${remoteURL}/starredFilmPairs/`).then((res) =>
            res.json()
        );
    };

    getStarredFilmComparisonsByUser = (userId) => {
        return fetch(`${remoteURL}/starredFilmPairs/?&userId=${userId}`).then(
            (res) => res.json()
        );
    };

    addStarredComparison = (userId, filmAId, filmBId) => {
        const starredFilmPair = {
            userId: userId,
            filmA: filmAId,
            filmB: filmBId,
        };
        return fetch(`${remoteURL}/starredFilmPairs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(starredFilmPair),
        }).then((response) => response.json());
    };

    getUserComparison = (userId, pair) => {
        return fetch(
            `${remoteURL}/userComparisons?userId=${userId}&plusFilmId=${pair.filmA}&plusFilmId=${pair.filmB}&minusFilmId=${pair.filmB}&minusFilmId=${pair.filmA}`
        ).then((res) => res.json());
    };

    getUserFilmRating = (userId, filmId) => {
        return fetch(
            `${remoteURL}/userFilmRating?userId=${userId}&filmId=${filmId}`
        ).then((res) => res.json());
    };

    setUserFilmRating = (userId, filmId, rating) => {
        return this.getUserFilmRating(userId, filmId).then((res) => {
            if (res.length > 0) {
                const userFilmRating = {
                    userId: userId,
                    filmId: parseInt(filmId),
                    rating: rating,
                };
                return fetch(`${remoteURL}/userFilmRating/${res[0].id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userFilmRating),
                }).then((res) => res.json());
            } else {
                const userFilmRating = {
                    userId: userId,
                    filmId: parseInt(filmId),
                    rating: rating,
                };
                return fetch(
                    `${remoteURL}/userFilmRating?userId=${userId}&filmId=${filmId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userFilmRating),
                    }
                ).then((res) => res.json());
            }
        });
    };
}
