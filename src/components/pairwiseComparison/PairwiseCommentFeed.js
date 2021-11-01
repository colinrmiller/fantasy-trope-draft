import React from "react";
import { useState, useEffect } from "react";
import { PairwiseCommentAPIManager } from "../../modules/PairwiseCommentAPIManager";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PairwiseCommentForm } from "../comments/PairwiseCommentForm";
import { PairwiseCommentCard } from "../cards/PairwiseCommentCard";
import "../comments/Comments.css";

export const PairwiseCommentFeed = ({ filmIdA, filmIdB }) => {
    const API = new PairwiseCommentAPIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const [commentList, setCommentList] = useState([]);
    const [commentFormActive, setCommentFormActive] = useState(false);
    // const [commentEditId, setcommentEditId] = useState(0);

    // const handleNewComment = () => {};
    useEffect(() => {
        getFilmComments();
    }, []);

    const handleCommentSubmit = (text) => {
        return API.addComment(text, currentUser, filmIdA, filmIdB).then(
            (res) => {
                getFilmComments();
                return res;
            }
        );
    };

    const handleDelete = (commentId) => {
        API.deleteComment(commentId).then(() => {
            getFilmComments();
        });
    };

    const getFilmComments = () => {
        API.getPairwiseComments(filmIdA, filmIdB).then((comments) => {
            setCommentList(comments);
        });
    };

    const handleCloseComment = () => {
        setCommentFormActive(false);
    };

    return (
        <div className="commentFeed">
            <div className="commentFeed__header pairwiseCommentFeed__header">
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
                    <PairwiseCommentForm
                        handleSubmitComment={handleCommentSubmit}
                        filmIdA={filmIdA}
                        filmIdB={filmIdB}
                        closeCommentForm={handleCloseComment}
                    />
                </div>
            ) : null}
            <div className="commentFeed__body">
                {commentList.length > 0 ? (
                    commentList.map((comment) => (
                        <PairwiseCommentCard
                            key={comment.id}
                            comment={comment}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p> </p>
                )}
            </div>
        </div>
    );
};
