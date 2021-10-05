import React, { useState } from "react";
import { TodaysDate } from "../modules/TodaysDate";

export const PropsAndState = ({ yourName }) => {
    let [countClicks, setCountClicks] = useState(0);
    let [saveNow, setSaveNow] = useState(false);

    let state = saveNow;
    const handleClick = () => {
        //good practice:
        //make a copy of state, modify it, and then setState to the copy
        const newCountClicks = ++countClicks;
        setCountClicks(newCountClicks);
    };

    const handleChange = (event) => {
        console.log("event:", event);
        let newSaveNow = saveNow;
        newSaveNow = false;
        setSaveNow(newSaveNow);
    };

    const date = Date.now;

    return (
        <>
            <h3>Welcome, {yourName} </h3>
            <p>{countClicks}</p>
            <button onClick={handleClick}>Click Me</button>
            <hr />
            <hr />
            <hr />
            <div>
                <textarea
                    type="text"
                    name="notes"
                    placeholder="notes"
                    onChange={handleChange}
                />

                <button id="save" disabled={state}>
                    Save
                </button>
            </div>
            {/* <div>
                <TodaysDate date={date} />
            </div> */}
        </>
    );
};
