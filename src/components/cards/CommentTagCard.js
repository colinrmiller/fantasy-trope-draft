import React from "react";
import "./Cards.css";
import { useState, useEffect } from "react";
// import { APIManager } from "../../modules/APIManager";
import { TagAPIManager } from "../../modules/TagAPIManager";

export const CommentTagCard = ({ tag, filmId }) => {
    const currentUser = parseInt(sessionStorage.getItem("active_user"));
    const API = new TagAPIManager();
    const [hover, setHover] = useState(false);
    const [userRating, setUserRating] = useState("");
    const [ratedTag, setRatedTag] = useState({ ...tag });

    // const [upVoteCount, setUpvoteCount] = useState(tag.plusRatings);
    // const [downVoteCount, setDownvoteCount] = useState(tag.minusRatings);
    let upVoteCount = 0;
    let downVoteCount = 0;

    // handleUpVote =() => {

    // }
    const handleUserRating = (rating) => {
        // get any previous user rating for currentUser and tagId
        // if no previous rating create a new UserFilmRating
        // if previous, modify it with new rating
        return API.getUserFilmTag(tag?.id, filmId)
            .then((userTag) => {
                if (userTag?.length > 0) {
                    const updatedTag = { ...userTag[0] };
                    switch (rating) {
                        case "plus":
                            updatedTag["rating"] = rating === "plus" ? 1 : -1;
                            return API.updateUserTag(updatedTag);
                        case "minus":
                            updatedTag["rating"] = rating === "plus" ? 1 : -1;
                            return API.updateUserTag(updatedTag);
                        case "":
                            return API.deleteUserTag(updatedTag);
                        default:
                    }
                    return API.updateUserTag(updatedTag);
                } else {
                    const newTag = {
                        filmId: filmId,
                        tagId: tag?.id,
                        userId: currentUser,
                    };
                    newTag["rating"] = rating === "plus" ? 1 : -1;
                    return API.addUserTag(newTag);
                }
            })
            .then(() => getTagRating());
    };

    const getUserRating = () => {
        // determine if the currentUser has +/- review on the tag
        API.getUserFilmTag(tag?.id, filmId).then((res) => {
            if (res) {
                if (res.length > 0) {
                    if (res[0].rating === 1) setUserRating("plus");
                    else if (res[0].rating === -1) setUserRating("minus");
                }
            }
        });
    };

    const getTagRating = () => {
        API.getUsersFilmTagTotal(filmId, tag?.id).then((totalTagList) => {
            const ratedTag = { ...tag };
            ratedTag["plusRatings"] = 0;
            ratedTag["minusRatings"] = 0;
            totalTagList.forEach((userTag) => {
                ratedTag["plusRatings"] =
                    userTag.rating === 1
                        ? ratedTag["plusRatings"] + 1
                        : ratedTag["plusRatings"];
                ratedTag["minusRatings"] =
                    userTag.rating === -1
                        ? ratedTag["minusRatings"] + 1
                        : ratedTag["minusRatings"];
            });
            setRatedTag(ratedTag);
        });
    };

    const handlePlusRating = () => {
        switch (userRating) {
            case "plus":
                // setUpvoteCount(upVoteCount - 1);
                setUserRating("");
                return handleUserRating("");
            case "":
                // setUpvoteCount(upVoteCount + 1);
                setUserRating("plus");
                return handleUserRating("plus");
            case "minus":
                // setUpvoteCount(upVoteCount + 1);
                // setDownvoteCount(downVoteCount - 1);
                setUserRating("plus");
                return handleUserRating("plus");
            default:
        }
    };

    const handleMinusRating = () => {
        switch (userRating) {
            case "plus":
                // setUpvoteCount(upVoteCount - 1);
                // setDownvoteCount(downVoteCount + 1);
                setUserRating("minus");
                return handleUserRating("minus");
            case "":
                // setDownvoteCount(downVoteCount + 1);
                setUserRating("minus");
                return handleUserRating("minus");
            case "minus":
                // setDownvoteCount(downVoteCount - 1);
                setUserRating("");
                return handleUserRating("");
            default:
        }
    };

    useEffect(() => {
        getUserRating();
        getTagRating();
    }, []);

    return !hover ? (
        <div
            className={"commentTagCard tagCard__" + tag?.type}
            // onMouseEnter={() => setHover(true)}
            // onMouseLeave={() => setHover(false)}
        >
            <div className="commentTagCard__text">{tag?.name}</div>
        </div>
    ) : (
        <div
            className={
                "commentTagCard commentTagCard__reveal commentTagCard__" +
                tag.type
            }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="commentTagCard__text">{tag?.name}</div>
            <div className="commentTagCard__dropdown">
                <div
                    className={
                        userRating === "minus"
                            ? "commentTagCard__minus vote--active"
                            : "commentTagCard__minus"
                    }
                    onClick={() => {
                        handleMinusRating().then(getUserRating);
                    }}
                >
                    - {ratedTag.minusRatings}
                </div>
                <div
                    className={
                        userRating === "plus"
                            ? "commentTagCard__minus vote--active"
                            : "commentTagCard__minus"
                    }
                    onClick={() => {
                        handlePlusRating().then(getUserRating);
                    }}
                >
                    &#10003; {ratedTag.plusRatings}
                </div>
                {/* <div className={"commentTagCard__dropdown commentTagCard__" + tag.tag.type}> */}
            </div>
        </div>
    );
};
