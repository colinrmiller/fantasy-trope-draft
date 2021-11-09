export const filterStarredComparisons = (comparisonList) => {
    // filter to only take no more than one pair per film
    if (comparisonList) {
        const uniqueFilmPairs = [];
        let filteredComparisons = [];

        const pairToString = (pair) => {
            // transform
            if (pair.filmA > pair.filmB) {
                return `${pair.filmA} ${pair.filmB}`;
            } else return `${pair.filmB} ${pair.filmA}`;
        };

        // find all unique film pairs
        comparisonList.forEach((pair) => {
            const pairString = pairToString(pair);
            if (!uniqueFilmPairs.includes(pairString)) {
                uniqueFilmPairs.push(pairString);
                filteredComparisons.push(pair);
            }
        });

        return filteredComparisons;
    }
};
