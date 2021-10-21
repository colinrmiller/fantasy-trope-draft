import { Button, Input } from "@mui/material";
import "../comments/Comments.css";
import React from "react";
import { TagAutocompleteHook } from "../comments/TagAutocompleteHook";
import { useState, useEffect } from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
// import { CommentAPIManager } from "../../modules/CommentAPIManager";

export const CommentCardEdit = ({ comment, handleSubmitEdit, cancelEdit }) => {
    const API = new TagAPIManager();
    // const CommentAPI = new CommentAPIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const emptyComment = {
        text: "",
        userId: currentUser,
        filmId: comment.filmId,
        tagId: 0,
        dateTime: Date.now(),
    };

    const [commentInput, setCommentInput] = useState(comment);
    const [tagList, setTagList] = useState([]);

    // const getEditText = (commentId) => {
    //     CommentAPI.getComment(commentId).then((res) => {
    //         setCommentInput(res);
    //     });
    // };

    const getTagList = () => {
        API.getTags().then((res) => setTagList(res));
    };

    useEffect(() => {
        getTagList();
        // if (commentEditId > 0) {
        //     getEditText(commentEditId).then((res) => {
        //         setCommentInput(res);
        //     });
        // }
    }, []);

    const onTextChangeHandler = (text) => {
        const newInput = { ...commentInput };
        newInput["text"] = text;
        setCommentInput(newInput);
    };

    // const onTagChangeHandler = (value) => {
    // };

    const handleSubmit = (event) => {
        if (commentInput.text !== "") {
            event.preventDefault();
            debugger;
            handleSubmitEdit(commentInput);
            // postMessage(commentInput);
            setCommentInput(emptyComment);
        }
    };

    return (
        <div className="messageInput" sx={{ display: "flex !important" }}>
            <TagAutocompleteHook optionList={tagList} />
            <Input
                id="messageInput__input"
                label=""
                variant="outlined"
                multiline="false"
                minRows="4"
                maxRows="5"
                onChange={(event) => onTextChangeHandler(event.target.value)}
                value={commentInput.text}
                sx={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    padding: "7px !important",
                    margin: "auto",
                    width: "60%",
                    marginInline: "10px",
                }}
            />
            <Button
                className="chatSubmitButton"
                sx={{
                    width: "70px",
                    height: "40px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "green",
                    color: "white",
                    marginTop: "10px",
                    "&:hover": { backgroundColor: "darkGreen" },
                }}
                onClick={() => cancelEdit()}
            >
                Cancel
            </Button>
            <Button
                className="chatSubmitButton"
                sx={{
                    width: "70px",
                    height: "40px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "green",
                    color: "white",
                    marginTop: "10px",
                    "&:hover": { backgroundColor: "darkGreen" },
                }}
                onClick={(event) => {
                    handleSubmit(event);
                    cancelEdit();
                }}
            >
                Submit
            </Button>
        </div>
    );
};
