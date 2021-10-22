import React from "react";

export const TimeUntil = () => {
    const timeNow = Date.now();

    const softDemo = Date.parse("Oct 29 2021 9:00 AM");
    const diff = softDemo - timeNow;
    const hours = Math.floor(diff / 3600 / 1000);
    const mins = Math.floor(diff / 60 / 1000) % 60;

    return (
        <h2 className="timeUntil">
            {"   " + hours + "hours " + mins + "mins"}
        </h2>
    );
};
