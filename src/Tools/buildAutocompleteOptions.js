/**
 * 
 * @param {itemsArray} array an array of objects that needs to be read to build an options array of Object for MUI autocomplete
* @param {options} object an object with 2 keys "label" and "id" needing strings indicating the name of the Object keys
* @returns {array<autocompleteOptions>} an array containing the options
 */

const buildAutocompleteOptions = (itemsArray, options) => {
    const defaultOptions = { label: 'name', id: 'id', ...options };

    const autocompleteOptionsArray = [];

    for (const items of itemsArray) {
        const optionObj = {
            label: items[defaultOptions.label],
            id: items[defaultOptions.id],
            unitId: items[defaultOptions.unitId]
        }
        autocompleteOptionsArray.push(optionObj);
    }

    return autocompleteOptionsArray;
}

export default buildAutocompleteOptions;