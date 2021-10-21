const remoteURL = "http://localhost:8088";

export class TagAPIManager {
    getUsersFilmTags = (filmId, tagId) => {
        return fetch(
            `${remoteURL}/usersFilmsTags/?filmId=${filmId}&tagId=${tagId}`
        ).then((res) => res.json());
    };

    getUsersFilmTagList = (filmId) => {
        return fetch(
            `${remoteURL}/usersFilmsTags/?filmId=${filmId}&_expand=tag`
        ).then((res) => res.json());
    };

    getUserFilmTagList = (userId, filmId) => {
        return fetch(
            `${remoteURL}/usersFilmsTags/?userId=${userId}&filmId=${filmId}&_expand=tag`
        ).then((res) => res.json());
    };

    getUserFilmTag = (tagId, filmId) => {
        const currentUser = parseInt(sessionStorage.getItem("active_user"));
        return fetch(
            `${remoteURL}/usersFilmsTags/?tagId=${tagId}&filmId=${filmId}&userId=${currentUser}`
        ).then((res) => res.json());
    };

    getRecentUserFilmTags = () => {
        return fetch(
            `${remoteURL}/usersFilmsTags/?_sort=dateTime&_order_desc`
        ).then((res) => res.json());
    };

    addNewTag = (tag) => {
        return fetch(`${remoteURL}/tags/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        }).then((response) => response.json());
    };

    // addFilmTag = (filmTag) => {
    //     return fetch(`${remoteURL}/filmsTags/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(filmTag),
    //     }).then((response) => response.json());
    // };

    // getFilmTag = (filmTagId) => {
    //     return fetch(`${remoteURL}/filmsTags/${filmTagId}`).then((res) =>
    //         res.json()
    //     );
    // };

    // updateFilmTag = (filmTag) => {
    //     return fetch(`${remoteURL}/filmsTags/${filmTag.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(filmTag),
    //     }).then((response) => response.json());
    // };

    updateUserTag = (userTag) => {
        return fetch(`${remoteURL}/usersFilmsTags/${userTag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userTag),
        }).then((response) => response.json());
    };

    deleteUserTag = (userTag) => {
        return fetch(`${remoteURL}/usersFilmsTags/${userTag.id}`, {
            method: "DELETE",
        }).then((response) => response.json());
    };

    addUserTag = (userTag) => {
        return fetch(`${remoteURL}/usersFilmsTags/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userTag),
        }).then((response) => response.json());
    };

    searchTag = (tag) => {
        return fetch(
            `${remoteURL}/tags/?name=${tag?.name}&type${tag?.type}`,
            {}
        ).then((response) => response.json());
    };

    getTags = () => {
        return fetch(`${remoteURL}/tags/`).then((res) => res.json());
    };
}
