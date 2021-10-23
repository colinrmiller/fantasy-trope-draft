import { Button, Input } from "@mui/material";
import "./Comments.css";
import React from "react";
import { TagAutocompleteHook } from "./TagAutocompleteHook";
import { useState, useEffect } from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
import { CommentAPIManager } from "../../modules/CommentAPIManager";

export const CommentForm = ({
    handleSubmitComment,
    filmId,
    closeCommentForm,
}) => {
    const API = new TagAPIManager();
    const CommentAPI = new CommentAPIManager();
    // const CommentAPI = new CommentAPIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const emptyComment = {
        text: "",
        userId: currentUser,
        filmId: parseInt(filmId),
        dateTime: Date.now(),
    };

    const [commentInput, setCommentInput] = useState(emptyComment);
    const [tagList, setTagList] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

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
        if (commentInput !== "") {
            event.preventDefault();
            handleSubmitComment(commentInput).then((res) => {
                const commentId = res.id;
                const tagIdArray = selectedTagIds.map((tag) => tag.id);
                CommentAPI.addCommentTags(commentId, tagIdArray);
            });
            // postMessage(commentInput);
            setCommentInput(emptyComment);
            closeCommentForm();
        }
    };

    // const handleAddTag = (newValue) => {
    //     const newTagsSelected = newValue;
    //     setSelectedTagIds(newTagsSelected);
    // };

    // onInputChange={(event, newInputValue) => {
    //     setInputValue(newInputValue);
    //   }}

    return (
        <div className="messageInput" sx={{ display: "flex !important" }}>
            {tagList.length > 0 ? (
                <TagAutocompleteHook
                    optionList={tagList}
                    setValue={setSelectedTagIds}
                    initialValue={selectedTagIds}
                />
            ) : null}
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
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    );
};
