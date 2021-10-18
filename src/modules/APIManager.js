import { tmdb } from "./keys.js";

const remoteURL = "http://localhost:8088";

export class APIManager {
    // target: json paramater to query;                     eg. "users", "articles", "tasks"
    // id: target/id;                                       eg. 1
    // expandArray: array of parameters to expand on;       eg. ["task", "article"]
    getById(target, id, expandArray = []) {
        //  add trailing string of expand parameters for non-empty expandArray
        let expandQuery = expandArray.length > 0 ? "?" : "";
        if (expandArray.length > 0) {
            expandArray.forEach((elem) => {
                expandQuery += `_expand=${elem}&`;
            });
        }
        let url = `${remoteURL}/${target}/${id}/${expandQuery}`;
        return fetch(url).then((res) => res.json());
    }

    getAll(target, expandArray = []) {
        let expandQuery = expandArray.length > 0 ? "?" : "";
        if (expandArray.length > 0) {
            expandArray.forEach((elem) => {
                expandQuery += `_expand=${elem}&`;
            });
        }
        let url = `${remoteURL}/${target}/${expandQuery}`;
        return fetch(url).then((res) => res.json());
    }

    getAllByUserId(target, userId, expandArray = []) {
        let queryParamaters = "?";
        if (expandArray.length > 0) {
            expandArray.forEach((elem) => {
                queryParamaters += `_expand=${elem}&`;
            });
        }
        queryParamaters += `userId=${userId}`;
        let url = `${remoteURL}/${target}/${queryParamaters}`;
        return fetch(url).then((res) => res.json());
    }

    getAllByUserArray(target, userArray, expandArray = []) {
        const currentUserId = parseInt(sessionStorage.getItem("active_user"));
        let queryString = "?";
        userArray = [...userArray, currentUserId];
        userArray.forEach((userId) => {
            queryString += `userId=${userId}&`;
        });

        if (expandArray.length > 0) {
            expandArray.forEach((elem) => {
                queryString += `_expand=${elem}&`;
            });
        }
        let url = `${remoteURL}/${target}/${queryString}`;
        return fetch(url).then((res) => res.json());
    }

    getRandomId(target) {
        return fetch(`${remoteURL}/${target}`)
            .then((result) => result.json())
            .then((objArray) => {
                const randomIndex = Math.floor(Math.random() * objArray.length);
                const randomObj = objArray[randomIndex];
                return randomObj.id;
            });
    }

    delete(target, id) {
        return fetch(`${remoteURL}/${target}/${id}`, {
            method: "DELETE",
        }).then((result) => result.json());
    }

    addEntry(target, newEntry) {
        return fetch(`${remoteURL}/${target}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        }).then((response) => response.json());
    }

    updateEntry(target, updatedEntry) {
        return fetch(`${remoteURL}/${target}/${updatedEntry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEntry),
        }).then((response) => response.json());
    }

    getFriends = () => {
        const currentUserId = parseInt(sessionStorage.getItem("active_user"));
        return fetch(
            `http://localhost:8088/friends?currentUserId=${currentUserId}&_expand=user`
        ).then((result) => result.json());
    };

    tmdbPopular = () => {
        return fetch(
            `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${tmdb}`
        ).then((res) => res.json());
    };

    tmdbQuery = (queryString) => {
        return fetch(
            `https://api.themoviedb.org/3/?${queryString}&api_key=${tmdb}`
        ).then((res) => res.json());
    };

    getFilm = (filmId) => {
        return fetch(
            `https://api.themoviedb.org/3/movie/${filmId}?api_key=${tmdb}`
        ).then((res) => res.json());
    };

    getPopular = () => {
        return fetch(
            `
            https://api.themoviedb.org/3/movie/popular?api_key=${tmdb}`
        ).then((res) => res.json());
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
    getAllFilms = (filmIds) => {
        if (filmIds.length > 0) {
            const promiseArray = filmIds.reduce((partialArray, filmId) => {
                partialArray.push(this.getFilm(filmId));
                return partialArray;
            }, []);
            const res = Promise.all(promiseArray);
            return res;
        }
    };

    getFilmSearch = (searchQuery) => {
        return fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${tmdb}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        ).then((res) => res.json());
    };

    // /(arrayOfFilmIds) -> (arrayOfFilmObjs)
    // fetchAllFilms = async (filmIds) => {
    //     ;
    //     const promiseArray = filmIds.reduce((promiseArray, filmId) => {
    //         return promiseArray.push(this.getFilm(res));
    //     }, []);
    //     ;
    //     const res = await Promise.all(promiseArray);
    //     // const jsons = await Promise.all(res.map((r) => r.json()));
    //     return res;
    // };

    // fetchAllFilms = async (filmIds) => {
    //     const res = await Promise.all(
    //         filmIds.slice(0, 1).map((filmId) => this.getFilm(filmId))
    //     );
    //     // const jsons = await Promise.all(res.map((r) => r.json()));
    //     return res;
    // };

    //   filmIds = [
    //     'https://yesno.wtf/api',
    //     'https://yesno.wtf/api',
    //     'https://yesno.wtf/api'
    //   ]
    //   fetchAll(filmIds)
}
