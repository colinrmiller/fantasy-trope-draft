import { useState } from "react";
import "./StarRating.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const StarRating = ({ handleRating }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="starRating">
            {/* {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={
                            "starRating__button " +
                            (index <= (hover || rating)
                                ? "starRating__button--on"
                                : "starRating__button--off")
                        }
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="starRating__star">&#9733;</span>
                    </button>
                );
            })} */}
            <Stack spacing={1}>
                <Rating
                    name="half-rating"
                    defaultValue={0}
                    precision={0.5}
                    value={rating}
                    onChange={(event, newRating) => {
                        setRating(newRating);
                    }}
                />
            </Stack>
        </div>
    );
};
