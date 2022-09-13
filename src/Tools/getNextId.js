
/**
 * 
 * @param {array<items>} array array containing all the elements
 * @param {currentId} currentId current id shown
 * @returns {object} it returns an object with previousId key and nextId key
 */
const getNextId = (arrayOfItems, currentId) => {
    let nextIndex, previousIndex;

    const findCurrentIndex = arrayOfItems.findIndex((item) => parseInt(item.id) === parseInt(currentId));
    ((findCurrentIndex + 1) === arrayOfItems.length) ? nextIndex = 0 : (nextIndex = (findCurrentIndex + 1));
    ((findCurrentIndex - 1) < 0) ? previousIndex = (arrayOfItems.length - 1) : (previousIndex = (findCurrentIndex - 1))

    return {
        previousId: arrayOfItems[previousIndex].id,
        nextId: arrayOfItems[nextIndex].id
    }
};

export default getNextId;