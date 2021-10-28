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

        // ... for each user, find one pair from each film they have pairged.
        // uniqueFilmPairs.forEach((userId) => {
        //     let uniqueUserFilmIds = []; // hold track of films so that no more than one pair is collected per film
        //     comparisonList.forEach((pair) => {
        //         // test if active user
        //         if (pair.userId == userId) {
        //             // test if film has already been counted
        //             if (!uniqueUserFilmIds.includes(pair.filmId)) {
        //                 // if not add pair and take note that the film has been addressed
        //                 filteredComparisons = [...filteredComparisons, pair];
        //                 uniqueUserFilmIds = [...uniqueUserFilmIds, pair.filmId];
        //             }
        //         }
        //     });
        // });

        return filteredComparisons;
    }
};
