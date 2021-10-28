// takes a list of comparison pairs = {
//     "plusFilmId": filmId
//     "minusFilmId": filmId
// }
// -> returns a list of filmIds ranked in order according to the Bradley-Terry Model for pairwise comparison

export const FilmRanking = (comparisonList) => {
    // generate list of all films reviewed..
    const fullFilmList = comparisonList.flatMap((filmPair) => [
        filmPair.plusFilmId,
        filmPair.minusFilmId,
    ]);
    // filter it for all unique values
    let filmIds = new Set(fullFilmList);

    // create a map of (film ids) -> (initial valuation = 1)
    const filmRankPairs = [...filmIds].map((filmId) => [filmId, 1]);
    const rankedFilmsMap = new Map(filmRankPairs);

    // apply Bradley-Terry Algorithm to update the rank of each film for each comparison
    comparisonList.forEach((filmPair) => {
        const plusEvaluation =
            rankedFilmsMap.get(filmPair.plusFilmId) +
            Math.exp(rankedFilmsMap.get(filmPair.plusFilmId)) /
                (Math.exp(rankedFilmsMap.get(filmPair.plusFilmId)) +
                    Math.exp(rankedFilmsMap.get(filmPair.minusFilmId)));
        const minusEvaluation =
            rankedFilmsMap.get(filmPair.plusFilmId) -
            Math.exp(rankedFilmsMap.get(filmPair.minusFilmId)) /
                (Math.exp(rankedFilmsMap.get(filmPair.plusFilmId)) +
                    Math.exp(rankedFilmsMap.get(filmPair.minusFilmId)));
        rankedFilmsMap.set(filmPair.plusFilmId, plusEvaluation);
        rankedFilmsMap.set(filmPair.minusFilmId, minusEvaluation);
    });

    // sort resulting ranked films in decreasing order
    const sortedRanking = new Map(
        [...rankedFilmsMap].sort((filmA, filmB) => {
            return filmB[1] - filmA[1];
        })
    );

    return sortedRanking;
};
