import React from "react";
import "./TagCard.css";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";

export const TagCard = ({
    tag,
    handlePlus,
    handleMinus,
    filmId,
    handleRating,
}) => {
    const API = new APIManager();
    const [hover, setHover] = useState(false);
    const [userVote, setUserVote] = useState("");
    const [upVoteCount, setUpvoteCount] = useState(tag.plusRatings);
    const [downVoteCount, setDownvoteCount] = useState(tag.minusRatings);

    const getVote = () => {
        // determine if the currentUser has +/- review on the tag
        API.getUserFilmTag(tag.id, filmId).then((res) => {
            debugger;
            if (res) {
                if (res.length > 0) {
                    if (res[0].rating === 1) setUserVote("plus");
                    else if (res[0].rating === -1) setUserVote("minus");
                }
            }
        });
    };

    const handlePlusRating = () => {
        switch (userVote) {
            case "plus":
                setUpvoteCount(upVoteCount - 1);
                setUserVote("");
                handleRating(tag.id, "");
                break;
            case "":
                setUpvoteCount(upVoteCount + 1);
                setUserVote("plus");
                handleRating(tag.id, "plus");

                break;
            case "minus":
                setUpvoteCount(upVoteCount + 1);
                setDownvoteCount(downVoteCount - 1);
                setUserVote("plus");
                handleRating(tag.id, "plus");
                break;
            default:
        }
    };

    const handleMinusRating = () => {
        switch (userVote) {
            case "plus":
                setUpvoteCount(upVoteCount - 1);
                setDownvoteCount(downVoteCount + 1);
                setUserVote("minus");
                handleRating(tag.id, "minus");
                break;
            case "":
                setDownvoteCount(downVoteCount + 1);
                setUserVote("minus");
                handleRating(tag.id, "minus");
                break;
            case "minus":
                setDownvoteCount(downVoteCount - 1);
                setUserVote("");
                handleRating(tag.id, "minus");
                break;
            default:
        }
    };

    useEffect(() => {
        getVote();
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
                        userVote === "minus"
                            ? "tagCard__minus vote--active"
                            : "tagCard__minus"
                    }
                    onClick={handleMinusRating}
                >
                    - {downVoteCount}
                </div>
                <div
                    className={
                        userVote === "plus"
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
