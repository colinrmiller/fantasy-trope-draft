import {
    createStyles,
    // fade,
    // Theme,
    makeStyles,
} from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "./SearchBar.css";
import { useState } from "react";

// import { useState } from "react";

// export const SearchBarComp = ({ searchQuery, setSearchQuery, onSubmit }) => {
//     const [state, setState] = useState();
//     return (
//         <SearchBar
//             value={state}
//             onChange={(newValue) => setState(newValue)}
//             onRequestSearch={() => setState("")}
//         />
//     );
// };

// export const SearchBar = ({ searchQuery, setSearchQuery, onSubmit }) => (
//     <form action="/" method="get" onSubmit={onSubmit}>
//         <label htmlFor="header-search">
//             <span className="visually-hidden"></span>
//         </label>
//         <input
//             type="text"
//             id="header-search"
//             placeholder="Search blog posts"
//             name="s"
//             value={searchQuery}
//             onChange={(event) => setSearchQuery(event.target.value)}
//         />
//         <button type="submit">Search</button>
//     </form>
// );

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         search: {
//             position: "relative",
//             borderRadius: theme.shape.borderRadius,
//             backgroundColor: fade(theme.palette.common.white, 0.15),
//             "&:hover": {
//                 backgroundColor: fade(theme.palette.common.white, 0.25),
//             },
//             marginLeft: 0,
//             width: "100%",
//             [theme.breakpoints.up("sm")]: {
//                 marginLeft: theme.spacing(1),
//                 width: "auto",
//             },
//         },
//         searchIcon: {
//             padding: theme.spacing(0, 2),
//             height: "100%",
//             position: "absolute",
//             pointerEvents: "none",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//         },
//         inputRoot: {
//             color: "inherit",
//         },
//         inputInput: {
//             padding: theme.spacing(1, 1, 1, 0),
//             // vertical padding + font size from searchIcon
//             paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//             transition: theme.transitions.create("width"),
//             width: "100%",
//             [theme.breakpoints.up("sm")]: {
//                 width: "12ch",
//                 "&:focus": {
//                     width: "20ch",
//                 },
//             },
//         },
//     })
// );

// TODO : Controlled input not working,
// cancel button to close search SpeechRecognitionResultList.
export const SearchBar = ({ handleSubmit }) => {
    // const classes = useStyles();
    const [value, setValue] = useState("");
    return (
        <div className="searchBar">
            <InputBase
                className="searchBar--input"
                value={value}
                onChange={(value) => {
                    debugger;
                    setValue(value);
                }}
                placeholder=" Search..."
                inputProps={{ "aria-label": "search " }}
                sx={{ background: "white", borderRadius: "2px" }}
            />
            <div
                className="searchBar--icon"
                onClick={(event) => {
                    // debugger;
                    handleSubmit(event, value);
                    setValue("");
                }}
            >
                <SearchIcon sx={{ fontSize: "30px" }} />
            </div>
        </div>
    );
};
