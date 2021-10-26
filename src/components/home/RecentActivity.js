import React from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
import { filterRecentTags } from "../utilities/filterRecentTags";
import { useState, useEffect } from "react";
import { TagActivityCard } from "../cards/TagActivityCard";
import "./RecentActivity.css";

export const RecentActivity = () => {
    const API = new TagAPIManager();
    const [recentTags, setRecentTags] = useState([]);
    const fetchLimit = 20;

    const getRecentTags = () => {
        API.getRecentUserFilmTags().then((res) => {
            setRecentTags(filterRecentTags(res));
        });
    };

    useEffect(getRecentTags, []);

    return (
        <div className="recentActivity">
            <h3 className="recentActivity__header">Recent Film Tags</h3>
            <hr />
            <div className="recentActivity__feed">
                {recentTags
                    .sort((tagA, tagB) => {
                        return tagB.dateTime - tagA.dateTime;
                    })
                    .filter((tag, index) => index > 80 && index < 90)
                    .map((tag) => {
                        return (
                            <TagActivityCard userFilmTag={tag} key={tag.id} />
                        );
                    })}
            </div>
        </div>
    );
};
