/**
 * 
 * @param {arrayOfItems} arrayOfItems array that needs to be filtered
 * @param {searchString} searchString string that we are looking for in the array
 * @param {options} optionsObject object with a label key precising on which attribute apply the searchString
 * @returns {filteredArray} filtered array with items containing the string we are looking for
 */

const filterArray = (arrayOfItems, searchString, optionsReceived) => {

    const options = {
        label: 'name',
        ...optionsReceived
    }

    const filteredArray = arrayOfItems.filter((item) => {
        return item[options.label].toLowerCase().includes(searchString.toLowerCase());
    })

    return filteredArray;
}

export default filterArray;