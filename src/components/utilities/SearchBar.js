// // import { useState } from "react";

// // export const SearchBarComp = ({ searchQuery, setSearchQuery, onSubmit }) => {
// //     const [state, setState] = useState();
// //     return (
// //         <SearchBar
// //             value={state}
// //             onChange={(newValue) => setState(newValue)}
// //             onRequestSearch={() => setState("")}
// //         />
// //     );
// // };

// // export const SearchBar = ({ searchQuery, setSearchQuery, onSubmit }) => (
// //     <form action="/" method="get" onSubmit={onSubmit}>
// //         <label htmlFor="header-search">
// //             <span className="visually-hidden"></span>
// //         </label>
// //         <input
// //             type="text"
// //             id="header-search"
// //             placeholder="Search blog posts"
// //             name="s"
// //             value={searchQuery}
// //             onChange={(event) => setSearchQuery(event.target.value)}
// //         />
// //         <button type="submit">Search</button>
// //     </form>
// // );

// import {
//     createStyles,
//     fade,
//     Theme,
//     makeStyles,
// } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";
// import InputBase from "@material-ui/core/InputBase";

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

// export default function Search() {
//     const classes = useStyles();
//     return (
//         <div className={classes.search}>
//             <div className={classes.searchIcon}>
//                 <SearchIcon />
//             </div>
//             <InputBase
//                 placeholder="Search..."
//                 classes={{
//                     root: classes.inputRoot,
//                     input: classes.inputInput,
//                 }}
//                 inputProps={{ "aria-label": "search " }}
//             />
//         </div>
//     );
// }
