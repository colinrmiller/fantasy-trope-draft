export const filterRecentTags = (tagList) => {
    // filter to only take no more than one tag per film
    let foundFilmIds = [];
    if (tagList) {
        return tagList.reduce((totalTags, tag) => {
            if (foundFilmIds.includes(tag.filmId)) return [...totalTags];
            else {
                foundFilmIds.push(tag.filmId);
                return [...totalTags, tag];
            }
        }, []);
    } else return [];
};
