import React from "react";
import { useState, useEffect } from "react";
import { CommentAPIManager } from "../../modules/CommentAPIManager";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CommentForm } from "./CommentForm";
import { CommentCard } from "../cards/CommentCard";
import "./Comments.css";

export const CommentFeed = ({ filmId }) => {
    const API = new CommentAPIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const [commentList, setCommentList] = useState([]);
    const [commentFormActive, setCommentFormActive] = useState(false);
    // const [commentEditId, setcommentEditId] = useState(0);

    // const handleNewComment = () => {};
    useEffect(() => {
        getFilmComments();
    }, []);

    const handleCommentSubmit = (text) => {
        return API.addComment(text, currentUser, filmId).then((res) => {
            getFilmComments();
            return res;
        });
    };

    const handleDelete = (commentId) => {
        API.deleteComment(commentId).then(() => {
            getFilmComments();
        });
    };

    const getFilmComments = () => {
        API.getFilmComments(filmId).then((comments) => {
            setCommentList(comments);
        });
    };

    const handleCloseComment = () => {
        setCommentFormActive(false);
    };

    return (
        <div className="commentFeed">
            <div className="commentFeed__header">
                <h2>Comments</h2>
                <div
                    className="commentFeed__newComment"
                    onClick={() => {
                        setCommentFormActive(!commentFormActive);
                    }}
                >
                    <div className="newComment__text">NEW COMMENT</div>
                    {!commentFormActive ? (
                        <div className="newComment__icon">
                            <AddIcon />
                        </div>
                    ) : (
                        <div className="newComment__icon">
                            <RemoveIcon />
                        </div>
                    )}
                </div>
            </div>
            <hr />
            {commentFormActive ? (
                <div className="commentFeed__CommentForm">
                    <CommentForm
                        handleSubmitComment={handleCommentSubmit}
                        filmId={filmId}
                        closeCommentForm={handleCloseComment}
                    />
                </div>
            ) : null}
            <div className="commentFeed__body">
                {commentList.length > 0 ? (
                    commentList.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : !commentFormActive ? (
                    <p style={{ display: "flex", flexDirection: "column" }}>
                        {" "}
                        It's a little quite here...
                        <break /> Be the first to leave a comment.
                    </p>
                ) : null}
            </div>
        </div>
    );
};
