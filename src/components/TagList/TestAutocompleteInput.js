import React from "react";

export const TestAutocompleteInput = ({ onSubmit }) => {
    return (
        <form
            action="/"
            method="get"
            onSubmit={(event) => onSubmit(event, input, type)}
            className="newTagInput__form"
        >
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <select
                id="new-tag-input_type"
                name="tagInput"
                value={0}
                onChange={(event) => setType(event.target.value)}
            >
                <option value="genre">genre</option>
                <option value="kind">kind</option>
                <option value="rating">rating</option>
                <option value="trope">trope</option>
            </select>
            {/* <AutocompleteComp /> */}
            {/* <Autocomplete
            disablePortal
            // id="new-tag-input"
            options={tagList}
            size="small"
            sx={{ width: 150, height: 40, background: "white" }}
            // placeholder="New Tag"
            getOptionLabel={(option) => option?.name.toString()}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Add Tag"
                    sx={{
                        width: 150,
                        height: 30,
                        background: "white",
                    }}
                />
            )}
            // value={input}
            // onChanxge={(event) => setInput(event.target.value)}
        /> */}
            <input
                type="text"
                id="new-tag-input"
                placeholder=""
                name="tagInput"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" className="newTagInput__submit">
                <AddIcon sx={{ margin: "auto" }} />
            </button>
        </form>
    );
};
