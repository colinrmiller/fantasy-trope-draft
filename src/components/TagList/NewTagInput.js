import AddIcon from "@mui/icons-material/Add";
import { Autocomplete } from "@mui/material";
import { AutocompleteComp } from "../utilities/AutocompleteComp";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { TagAPIManager } from "../../modules/TagAPIManager";
import { useAutocomplete } from "@mui/core";
import "./TagList.css";

export const NewTagInput = ({ onSubmit }) => {
    const API = new TagAPIManager();

    const [tagList, setTagList] = useState([]);
    const [input, setInput] = useState("");
    const [type, setType] = useState(0);
    const [createNewTag, setCreateNewTag] = useState(false);

    const getTagList = () => {
        API.getTags().then((res) => setTagList(res));
    };

    const handleInputChange = (value) => {
        setInput(value);
    };

    const handleNewTag = () => {
        setCreateNewTag(!createNewTag);
    };

    useEffect(() => {
        getTagList();
    }, []);

    if (tagList) {
        return (
            <div className="newTagInput__container">
                <form
                    action="/"
                    method="get"
                    onSubmit={(event) => onSubmit(event, input, type)}
                    className="newTagInput__form"
                >
                    <label htmlFor="header-search">
                        <span className="visually-hidden"></span>
                    </label>
                    {createNewTag ? (
                        <>
                            <select
                                id="new-tag-input_type"
                                name="tagInput"
                                value={0}
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                            >
                                <option value="genre">genre</option>
                                <option value="kind">kind</option>
                                <option value="rating">rating</option>
                                <option value="trope">trope</option>
                            </select>
                            <input
                                type="text"
                                id="new-tag-input"
                                placeholder=""
                                name="tagInput"
                                value={input}
                                onChange={(event) =>
                                    setInput(event.target.value)
                                }
                            />
                        </>
                    ) : (
                        <AutocompleteComp
                            handleChange={handleInputChange}
                            optionList={tagList}
                            inputValue={input}
                        />
                    )}
                    <button type="submit" className="newTagInput__submit">
                        <AddIcon sx={{ margin: "auto" }} />
                    </button>
                    {createNewTag ? (
                        <p
                            className="newTagInput__newTag--button"
                            onClick={handleNewTag}
                        >
                            Cancel
                        </p>
                    ) : (
                        <p
                            className="newTagInput__newTag--button"
                            onClick={handleNewTag}
                        >
                            Create New Tag
                        </p>
                    )}
                </form>
            </div>
        );
    }
};
