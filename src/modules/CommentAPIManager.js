const remoteURL = "http://localhost:8088";

export class CommentAPIManager {
    currentUser = parseInt(sessionStorage.getItem("active_user"));

    getComment = (commentId) => {
        return fetch(`${remoteURL}/comments/${commentId}`).then((res) =>
            res.json()
        );
    };

    addComment = (comment) => {
        return fetch(`${remoteURL}/comments/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }).then((response) => response.json());
    };

    // addComment = (text, userId, filmId, tagId = 0) => {
    //     const comment = {
    //         text: text,
    //         userId: this.currentUser,
    //         filmId: filmId,
    //         tagId: tagId,
    //         dateTime: Date.now(),
    //     };
    //     return fetch(`${remoteURL}/comments/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(comment),
    //     }).then((response) => response.json());
    // };

    editComment = (comment) => {
        return fetch(`${remoteURL}/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }).then((response) => response.json());
    };

    deleteComment = (commentId) => {
        return fetch(`${remoteURL}/comments/${commentId}`, {
            method: "DELETE",
        }).then((response) => response.json());
    };

    // updateComment = (text, comment) => {
    //     const newComment = { ...comment };
    //     return fetch(`${remoteURL}/comments/${comment.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newComment),
    //     }).then((response) => response.json());
    // };

    getFilmComments = (filmId) => {
        return fetch(`${remoteURL}/comments/?filmId=${filmId}`).then((res) =>
            res.json()
        );
    };

    getUsersFilmComments = (filmId, [userList]) => {
        let queryString = `?filmId=${filmId}&tagId=0`;
        userList.forEach((userId) => (queryString += `&userId=${userId}`));
        return fetch(`${remoteURL}/comments/${queryString}`).then((res) =>
            res.json()
        );
    };

    getFilmTagComments = (filmId, tagId) => {
        let queryString = `?filmId=${filmId}&tagId=${tagId}`;
        return fetch(`${remoteURL}/comments/${queryString}`).then((res) =>
            res.json()
        );
    };

    addCommentTag = (commentId, tagId) => {
        const newCommentTag = {
            commentId: commentId,
            tagId: tagId,
        };
        return fetch(`${remoteURL}/commentsTags/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCommentTag),
        }).then((response) => response.json());
    };

    addCommentTags = (commentId, tagIdList) => {
        // if (tagIdList.length > 0) {
        const promiseArray = tagIdList.map((tagId) =>
            this.addCommentTag(commentId, tagId)
        );
        // const promiseArray = tagIdList.reduce((partialArray, filmId) => {
        //     partialArray = [...partialArray, this.getFilm(filmId)];
        //     // partialArray.push(this.getFilm(filmId));
        //     return partialArray;
        // }, []);
        const res = Promise.all(promiseArray);
        return res;
        // }
    };

    getCommentTag = (commentId, tagId) => {
        return fetch(
            `${remoteURL}/commentsTags/?commentId=${commentId}&tagId=${tagId}&_expand=tag`
        ).then((response) => response.json());
    };

    getCommentTags = (commentId) => {
        return fetch(
            `${remoteURL}/commentsTags/?commentId=${commentId}&_expand=tag`
        ).then((response) => response.json());
    };

    deleteCommentTag = (commentTagId) => {
        // return this.getCommentTag(commentId, tagId).then((res) => {
        //     const commentTagId = res.id;
        //     if (res.length > 0) {
        return fetch(`${remoteURL}/commentsTags/${commentTagId}`, {
            method: "DELETE",
        }).then((result) => result.json());
        //     } else return null;
        // });
    };

    deleteCommentTags = (commentId, tagIdList) => {
        const promiseArray = tagIdList.map((tagId) => {
            return this.deleteCommentTag(tagId);
        });
        return Promise.all(promiseArray);
    };

    // addFilmComment = (filmComment) => {
    //     return fetch(`${remoteURL}/filmsComments/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(filmComment),
    //     }).then((response) => response.json());
    // };

    getAllFilmsByIdArray = (filmIds) => {
        if (filmIds.length > 0) {
            const promiseArray = filmIds.reduce((partialArray, filmId) => {
                partialArray.push(this.getFilm(filmId));
                return partialArray;
            }, []);
            const res = Promise.all(promiseArray);
            return res;
        }
    };
    // getUsersFilmCommentList = (filmId) => {
    //     return fetch(
    //         `${remoteURL}/usersFilmsComments/?filmId=${filmId}&_expand=comment`
    //     ).then((res) => res.json());
    // };

    // getUserFilmComment = (commentId, filmId) => {
    //     const currentUser = parseInt(sessionStorage.getItem("active_user"));
    //     return fetch(
    //         `${remoteURL}/usersFilmsComments/?commentId=${commentId}&filmId=${filmId}&userId=${currentUser}`
    //     ).then((res) => res.json());
    // };

    // addFilmComment = (filmComment) => {
    //     return fetch(`${remoteURL}/filmsComments/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(filmComment),
    //     }).then((response) => response.json());
    // };

    // getFilmComment = (filmCommentId) => {
    //     return fetch(`${remoteURL}/filmsComments/${filmCommentId}`).then(
    //         (res) => res.json()
    //     );
    // };

    // updateFilmComment = (filmComment) => {
    //     return fetch(`${remoteURL}/filmsComments/${filmComment.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(filmComment),
    //     }).then((response) => response.json());
    // };

    // updateUserComment = (userComment) => {
    //     return fetch(`${remoteURL}/usersFilmsComments/${userComment.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userComment),
    //     }).then((response) => response.json());
    // };

    // addUserComment = (userComment) => {
    //     return fetch(`${remoteURL}/usersFilmsComments/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(userComment),
    //     }).then((response) => response.json());
    // };

    // searchComment = (comment) => {
    //     return fetch(
    //         `${remoteURL}/comments/?name=${comment?.name}&type${comment?.type}`,
    //         {}
    //     ).then((response) => response.json());
    // };
}
