import { useState, useEffect } from "react";
import "./StarRating.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";

export const StarRating = ({ userRating, handleRating }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setRating(userRating);
    }, [userRating]);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const ratingBar = (initialRating) => {
        if (!loaded) {
            return <></>;
        } else {
            return (
                <div className="starRating">
                    <Stack spacing={1}>
                        <Rating
                            name="half-rating"
                            defaultValue={rating}
                            precision={0.5}
                            // sx={{ color: "white" }}
                            emptyIcon={
                                <StarIcon
                                    style={{ opacity: 0.55, color: "white" }}
                                    fontSize="inherit"
                                />
                            }
                            value={rating}
                            onChange={(event, newRating) => {
                                setRating(newRating);
                                handleRating(newRating);
                            }}
                        />
                    </Stack>
                </div>
            );
        }
    };

    return ratingBar(rating);
};
