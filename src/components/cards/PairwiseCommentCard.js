import React from "react";
import { APIManager } from "../../modules/APIManager";
import { PairwiseCommentAPIManager } from "../../modules/PairwiseCommentAPIManager";
import { useState, useEffect } from "react";
import { dateConversion } from "../utilities/dateConversion";
import "./Cards.css";

import { CommentCardBody } from "./CommentCardBody";
import { CommentCardEdit } from "./CommentCardEdit";
import { UserCard } from "./UserCard";
import { Button } from "@mui/material";

// TODO : Testing, edit comment
export const PairwiseCommentCard = ({ comment, handleDelete }) => {
    const API = new APIManager();
    const CommentAPI = new PairwiseCommentAPIManager();

    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const [commentUser, setCommentUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    const [activeComment, setActiveComment] = useState({ ...comment });

    useEffect(() => {
        API.getUser(comment.userId).then((user) => {
            setCommentUser(user);
        });
    }, []);

    const handleSubmitEdit = (comment) => {
        setActiveComment(comment);
        CommentAPI.editPairwiseComment(comment);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    return (
        <div className="commentCard">
            <div className="commentCard__header">
                <UserCard user={commentUser} />
                {/* <h5 className="commentCard__user">{commentUser.username}</h5> */}
                <p className="commentCard__date">
                    {dateConversion(comment.dateTime)}
                </p>
            </div>
            {/* {!isEditing ? () : null} */}

            {!isEditing ? (
                <CommentCardBody
                    comment={activeComment}
                    isCurrentUser={currentUser == commentUser.id}
                    setIsEditing={setIsEditing}
                    handleDelete={handleDelete}
                    tagList={[]}
                />
            ) : (
                <CommentCardEdit
                    comment={activeComment}
                    handleSubmitEdit={handleSubmitEdit}
                    cancelEdit={handleCancelEdit}
                />
            )}

            {/* <div className="commentCard__text">{comment.text}</div>
            {commentUser.id == currentUser ? (
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
            ) : null} */}
        </div>
    );
};
