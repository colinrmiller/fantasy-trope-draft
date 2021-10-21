import React from "react";
import "./TagCard.css";
import { useState, useEffect } from "react";
// import { APIManager } from "../../modules/APIManager";
import { TagAPIManager } from "../../modules/TagAPIManager";

export const TagCard = ({ tag, filmId, handleRating }) => {
    const API = new TagAPIManager();
    const [hover, setHover] = useState(false);
    const [userRating, setUserRating] = useState("");
    const [upVoteCount, setUpvoteCount] = useState(tag.plusRatings);
    const [downVoteCount, setDownvoteCount] = useState(tag.minusRatings);

    const getUserRating = () => {
        // determine if the currentUser has +/- review on the tag
        API.getUserFilmTag(tag.id, filmId).then((res) => {
            if (res) {
                if (res.length > 0) {
                    if (res[0].rating === 1) setUserRating("plus");
                    else if (res[0].rating === -1) setUserRating("minus");
                }
            }
        });
    };

    const handlePlusRating = () => {
        switch (userRating) {
            case "plus":
                setUpvoteCount(upVoteCount - 1);
                setUserRating("");
                handleRating(tag.id, "");
                break;
            case "":
                setUpvoteCount(upVoteCount + 1);
                setUserRating("plus");
                handleRating(tag.id, "plus");

                break;
            case "minus":
                setUpvoteCount(upVoteCount + 1);
                setDownvoteCount(downVoteCount - 1);
                setUserRating("plus");
                handleRating(tag.id, "plus");
                break;
            default:
        }
    };

    const handleMinusRating = () => {
        switch (userRating) {
            case "plus":
                setUpvoteCount(upVoteCount - 1);
                setDownvoteCount(downVoteCount + 1);
                setUserRating("minus");
                handleRating(tag.id, "minus");
                break;
            case "":
                setDownvoteCount(downVoteCount + 1);
                setUserRating("minus");
                handleRating(tag.id, "minus");
                break;
            case "minus":
                setDownvoteCount(downVoteCount - 1);
                setUserRating("");
                handleRating(tag.id, "minus");
                break;
            default:
        }
    };

    useEffect(() => {
        getUserRating();
    }, []);

    return !hover ? (
        <div
            className={"tagCard tagCard__" + tag.type}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="tagCard__text">{tag.name}</div>
        </div>
    ) : (
        <div
            className={"tagCard tagCard__reveal tagCard__" + tag.type}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="tagCard__text">{tag.name}</div>
            <div className="tagCard__dropdown">
                <div
                    className={
                        userRating === "minus"
                            ? "tagCard__minus vote--active"
                            : "tagCard__minus"
                    }
                    onClick={handleMinusRating}
                >
                    - {downVoteCount}
                </div>
                <div
                    className={
                        userRating === "plus"
                            ? "tagCard__minus vote--active"
                            : "tagCard__minus"
                    }
                    onClick={handlePlusRating}
                >
                    &#10003; {upVoteCount}
                </div>
                {/* <div className={"tagCard__dropdown tagCard__" + tag.tag.type}> */}
            </div>
        </div>
    );
};
