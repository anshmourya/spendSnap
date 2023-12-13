// helper.js

export const getHighestCategory = (categories) => {
    if (!categories || categories.length === 0) {
        return null; // or handle the case when categories is undefined or empty
    }

    return categories.reduce((max, category) => (category.total > max.total ? category : max), categories[0]);
};
