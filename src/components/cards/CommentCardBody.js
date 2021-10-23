import React from "react";
import "../comments/Comments.css";
import { TagCard } from "./TagCard";
export const CommentCardBody = ({
    isCurrentUser,
    comment,
    setIsEditing,
    handleDelete,
    tagList,
}) => {
    return (
        <>
            <div className="commentCard__tagList">
                {tagList.map((tag) => (
                    <TagCard tag={tag} filmId={comment.filmId} key={tag.id} />
                ))}
            </div>
            <div className="commentCard__text">{comment.text}</div>
            {isCurrentUser ? (
                <div className="commentCard__interaction">
                    <div
                        className="commentCard__button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </div>
                    <div
                        className="commentCard__button"
                        onClick={() => handleDelete(comment.id)}
                    >
                        Remove
                    </div>
                </div>
            ) : null}
        </>
    );
};
