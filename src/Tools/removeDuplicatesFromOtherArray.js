/**
 * 
 * @param {array1} arrayToSanitize array containing items to remove
 * @param {array2} arrayContainingRootItems array containing items that should not be in array1
 * @returns {sanitizeArray} array1 with root items removed
 */

const removeDuplicatesFromOtherArray = (array1, array2) => {
    for (const rootItem of array2) {
        const findIndex = array1.findIndex((item) => parseInt(item.id) === parseInt(rootItem.id))
        if (findIndex !== -1) {
            array1.splice(findIndex, 1);
        }
    }

    return array1;
}

export default removeDuplicatesFromOtherArray;