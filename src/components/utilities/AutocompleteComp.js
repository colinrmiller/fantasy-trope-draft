import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

const options = ["Option 1", "Option 2"];

export function AutocompleteComp({ optionList, handleChange, inputValue }) {
    const [value, setValue] = useState(null);
    // const [inputValue, setInputValue] = useState("");
    // const [inputValue, setInputValue] = React.useState("");

    return (
        <div>
            {/* <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <br /> */}
            <Autocomplete
                size="small"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                // onInputChange
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                // }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    handleChange(newInputValue);
                }}
                id="controllable-states-demo"
                options={optionList}
                getOptionLabel={(option) => option.name || ""}
                sx={{ width: 300, background: "white" }}
                renderInput={(params) => <TextField {...params} />}
            />
        </div>
    );
}
