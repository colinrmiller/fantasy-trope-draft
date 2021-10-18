import { useState } from "react";
import "./StarRating.css";

export const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="starRating">
            {[...Array(5)].map((star, index) => {
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
            })}
        </div>
    );
};
