import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import "../TagList/TagList.css";

const options = ["Option 1", "Option 2"];

export function AutocompleteComp({ optionList, handleChange, inputValue }) {
    const [value, setValue] = useState(null);
    // const [inputValue, setInputValue] = useState("");
    // const [inputValue, setInputValue] = React.useState("");
    const modifiedOptionList = optionList.map((obj) => {
        const copy = { ...obj };
        copy["label"] = obj["name"];
        return copy;
    });

    return (
        <div>
            <Autocomplete
                size="small"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                className="tagList__autocomplete"
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    handleChange(newInputValue);
                }}
                id="controllable-states-demo"
                options={modifiedOptionList}
                sx={{ width: 220, background: "white" }}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
    );
}
