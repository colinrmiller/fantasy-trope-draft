import React from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
import { filterRecentTags } from "../utilities/filterRecentTags";
import { useState, useEffect } from "react";
import { TagActivityCard } from "../cards/TagActivityCard";

export const RecentActivity = () => {
    const API = new TagAPIManager();
    const [recentTags, setRecentTags] = useState([]);

    const getRecentTags = () => {
        API.getRecentUserFilmTags().then((res) => {
            setRecentTags(filterRecentTags(res));
        });
    };

    useEffect(getRecentTags, []);

    return (
        <div className="recentActivity">
            {recentTags.map((tag) => {
                return <TagActivityCard userFilmTag={tag} key={tag.id} />;
            })}
        </div>
    );
};
