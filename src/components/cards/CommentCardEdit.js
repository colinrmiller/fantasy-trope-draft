import { Button, Input } from "@mui/material";
import React from "react";
import { TagAutocompleteHook } from "../comments/TagAutocompleteHook";
import { useState, useEffect } from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
import { CommentAPIManager } from "../../modules/CommentAPIManager";
import "./Cards.css";

export const CommentCardEdit = ({ comment, handleSubmitEdit, cancelEdit }) => {
    const API = new TagAPIManager();
    const CommentAPI = new CommentAPIManager();
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    const [commentInput, setCommentInput] = useState(comment);
    const [tagList, setTagList] = useState([]);
    const [inputTagList, setInputTagList] = useState([]);

    const emptyComment = {
        text: "",
        userId: currentUser,
        filmId: comment.filmId,
        dateTime: Date.now(),
    };

    const getTagList = () => {
        API.getTags().then((res) => setTagList(res));
    };

    const getCommentTags = () => {
        return CommentAPI.getCommentTags(comment.id).then((res) => {
            const inputTagArray = res.map((commentTag) => commentTag.tag);
            setInputTagList(inputTagArray);
        });
    };

    useEffect(() => {
        getTagList();
        getCommentTags();
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
            handleRewriteTags().then(() => {
                handleSubmitEdit(commentInput);
                // postMessage(commentInput);
                setCommentInput(emptyComment);
            });
        }
    };

    const handleRewriteTags = () => {
        return CommentAPI.getCommentTags(comment.id).then((res) => {
            const tagIdArray = res.map((commentTag) => commentTag.id);
            return CommentAPI.deleteCommentTags(comment.id, tagIdArray).then(
                (res) => {
                    const inputTagIdList = inputTagList.map((tag) => tag.id);
                    return CommentAPI.addCommentTags(
                        comment.id,
                        inputTagIdList
                    );
                    // .then(() => {
                    //     getTagList();
                    // });
                }
            );
        });
    };

    return (
        <div className="commentCardEdit" sx={{ display: "flex !important" }}>
            <TagAutocompleteHook
                optionList={tagList}
                className="commentCardEdit__tagInput"
                initialValue={inputTagList}
                setValue={setInputTagList}
            />
            <div className="commentCardEdit__body">
                <Input
                    id="messageInput__input"
                    label=""
                    className="commentCardEdit__textInput"
                    variant="outlined"
                    multiline="false"
                    minRows="4"
                    maxRows="5"
                    onChange={(event) =>
                        onTextChangeHandler(event.target.value)
                    }
                    value={commentInput.text}
                    sx={{
                        border: "1px solid black",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        padding: "7px !important",
                        margin: "auto",
                        width: "80%",
                        marginInline: "10px",
                    }}
                />
                <div className="commentCardEdit__buttons">
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
                            marginInline: "8px",

                            "&:hover": { backgroundColor: "darkGreen" },
                        }}
                        onClick={(event) => {
                            handleSubmit(event);
                            cancelEdit();
                        }}
                    >
                        Submit
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
                            marginInline: "8px",
                            "&:hover": { backgroundColor: "darkGreen" },
                        }}
                        onClick={() => cancelEdit()}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};
