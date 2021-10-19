import React from "react";
import { NewTagInput } from "./NewTagInput";
import "./TagList.css";
import { useState, useEffect } from "react";
import { APIManager } from "../../modules/APIManager";
import { TagCard } from "../cards/TagCard";

export const TagList = ({ filmId }) => {
    const API = new APIManager();
    const [tagList, setTagList] = useState([]); // all filmId tags, _expand=tag
    const currentUser = parseInt(sessionStorage.getItem("active_user"));

    // reduce all duplicates of a tag in the tagObj list to get a list of unique tags
    const reduceTagList = (tagObjList) => {
        const uniqueStringifiedTags = new Set();
        tagObjList.forEach((tag) => {
            uniqueStringifiedTags.add(JSON.stringify(tag));
        });
        const uniqueObjectifiedTags = [...uniqueStringifiedTags].map((item) =>
            JSON.parse(item)
        );
        return uniqueObjectifiedTags;
    };

    // take the total list of tags with Reviews, and the list of unique tags and create a list of unique tags with review count
    const reviewTags = (totalTagList, uniqueTags) => {
        const uniqueRatedTags = uniqueTags.map((tag) => {
            const ratedTag = { ...tag };
            ratedTag["plusRatings"] = 0;
            ratedTag["minusRatings"] = 0;
            totalTagList
                .filter((userTag) => userTag.tagId === tag.id)
                .forEach((userTag) => {
                    ratedTag["plusRatings"] =
                        userTag.rating === 1
                            ? ratedTag["plusRatings"] + 1
                            : ratedTag["plusRatings"];
                    ratedTag["minusRatings"] =
                        userTag.rating === -1
                            ? ratedTag["minusRatings"] + 1
                            : ratedTag["minusRatings"];
                });
            return ratedTag;
        });
        return uniqueRatedTags;
    };

    const getTagList = () => {
        API.getUsersFilmTagList(filmId).then((totalUsersTagsList) => {
            const tagList = totalUsersTagsList.map((userTag) => userTag.tag);
            const uniqueTags = reduceTagList(tagList);
            const reviewedTags = reviewTags(totalUsersTagsList, uniqueTags);
            setTagList(reviewedTags);
        });
    };

    const handleNewTagSubmit = (event, input, type) => {
        event.preventDefault();
        const tag = {
            name: input,
            type: type,
        };
        if (input.length > 0) {
            // test for an already existing tag
            API.searchTag(tag).then((res) => {
                if (res?.length > 0) {
                    // if the tag already exists POST userTag
                    const userTag = {
                        tagId: res[0].id,
                        filmId: filmId,
                        userId: currentUser,
                        rating: 1,
                    };

                    API.addUserTag(userTag).then(getTagList);
                } else {
                    // if a new tag POST tag, then POST userTag
                    API.addTag(tag).then((res) => {
                        const userTag = {
                            userId: currentUser,
                            filmId: filmId,
                            tagId: res.id,
                            rating: 1,
                        };
                        API.addUserTag(userTag).then(getTagList);
                    });
                }
            });
        }
    };

    const handleUserRating = (tagId, rating) => {
        // get any previous user rating for currentUser and tagId
        // if no previous rating create a new UserFilmRating
        // if previous, modify it with new rating
        return API.getUserFilmTag(tagId, filmId).then((userTag) => {
            debugger;
            if (userTag?.length > 0) {
                const updatedTag = { ...userTag[0] };
                switch (rating) {
                    case "plus":
                        updatedTag["rating"] = rating === "plus" ? 1 : -1;
                        return API.updateUserTag(updatedTag);
                    case "minus":
                        updatedTag["rating"] = rating === "plus" ? 1 : -1;
                        return API.updateUserTag(updatedTag);
                    case "":
                        return API.deleteUserTag(updatedTag);
                    default:
                }
                return API.updateUserTag(updatedTag);
            } else {
                const newTag = {
                    filmId: filmId,
                    tagId: tagId,
                    userId: currentUser,
                };
                newTag["rating"] = rating === "plus" ? 1 : -1;
                return API.addUserTag(newTag);
            }
        });
    };

    useEffect(() => {
        getTagList();
    }, [filmId]);

    return (
        <div className="tagList">
            <NewTagInput onSubmit={handleNewTagSubmit} />
            {tagList.map((tag) => {
                return (
                    <TagCard
                        key={tag.id}
                        tag={tag}
                        // updateTag={updateTag}
                        // handlePlus={(tagId) => {
                        //     handleUserRating(tagId, "plus");
                        //     // updateTag(tagId, "plus");
                        // }}
                        // handleMinus={(tagId) => {
                        //     handleUserRating(tagId, "minus");
                        // }}
                        handleRating={handleUserRating}
                        filmId={filmId}
                    />
                );
            })}
        </div>
    );
};
