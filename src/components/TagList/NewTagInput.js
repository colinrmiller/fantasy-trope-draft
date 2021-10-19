import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export const NewTagInput = ({ onSubmit }) => {
    const [input, setInput] = useState("");
    const [type, setType] = useState(0);
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
        </div>
    );
};
