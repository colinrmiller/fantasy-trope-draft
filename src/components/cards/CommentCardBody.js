import React from "react";
import "../comments/Comments.css";
import { CommentTagCard } from "./CommentTagCard";
import { Button } from "@mui/material";

export const CommentCardBody = ({
    isCurrentUser,
    comment,
    setIsEditing,
    handleDelete,
    tagList,
}) => {
    return (
        <>
            <div className="commentCard__text">{comment.text}</div>
            {isCurrentUser ? (
                <>
                    <div className="commentCard__tagList">
                        {tagList.map((tag) => (
                            <CommentTagCard
                                tag={tag}
                                filmId={comment.filmId}
                                key={tag.id}
                            />
                        ))}
                    </div>
                    <div className="commentCard__interaction">
                        {" "}
                        <Button
                            className="chatSubmitButton"
                            sx={{
                                width: "60px",
                                height: "40px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                backgroundColor: "green",
                                color: "white",
                                marginTop: "10px",
                                marginInline: "8px",

                                "&:hover": { backgroundColor: "darkGreen" },
                            }}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="chatSubmitButton"
                            sx={{
                                width: "90px",
                                height: "40px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                backgroundColor: "#b70000",
                                color: "white",
                                marginTop: "10px",
                                marginInline: "8px",

                                "&:hover": { backgroundColor: "#870000" },
                            }}
                            onClick={() => handleDelete(comment.id)}
                        >
                            Remove
                        </Button>
                        {/* <div
                            className="commentCard__button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </div> */}
                        {/* <div
                            className="commentCard__button"
                            onClick={() => handleDelete(comment.id)}
                        >
                            Remove
                        </div> */}
                    </div>
                </>
            ) : (
                <>
                    {" "}
                    <div className="commentCard__tagList">
                        {tagList.map((tag) => (
                            <CommentTagCard
                                tag={tag}
                                filmId={comment.filmId}
                                key={tag.id}
                            />
                        ))}
                    </div>
                    {/* <div
                className="commentCard__button"
                onClick={() => setIsEditing(true)}
            >
                Edit
            </div> */}
                    {/* <div
                className="commentCard__button"
                onClick={() => handleDelete(comment.id)}
            >
                Remove
            </div> */}
                </>
            )}
        </>
    );
};
