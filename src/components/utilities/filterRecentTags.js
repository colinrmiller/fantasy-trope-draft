export const filterRecentTags = (tagList) => {
    // filter to only take no more than one tag per film
    if (tagList) {
        const uniqueUserIds = [];
        let filteredTags = [];

        // find all unique users with active tags,  then...
        tagList.forEach((tag) => {
            if (!uniqueUserIds.includes(tag.userId)) {
                uniqueUserIds.push(tag.userId);
            }
        });
        // ... for each user, find one tag from each film they have tagged.
        uniqueUserIds.forEach((userId) => {
            let uniqueUserFilmIds = []; // hold track of films so that no more than one tag is collected per film
            tagList.forEach((tag) => {
                // test if active user
                if (tag.userId == userId) {
                    // test if film has already been counted
                    if (!uniqueUserFilmIds.includes(tag.filmId)) {
                        // if not add tag and take note that the film has been addressed
                        filteredTags = [...filteredTags, tag];
                        uniqueUserFilmIds = [...uniqueUserFilmIds, tag.filmId];
                    }
                }
            });
        });

        return filteredTags;
    }
};
