/**
 * 
 * @param {object} any object that needs to be transformed in a formData 
 * @returns {formData} a formData object for a multipart encoded API call
 */

const convertObjectToFormData = (object) => {
    var formData = new FormData();

    for (const key in object) {
        formData.append(key, object[key]);
    }

    return formData;
}

export default convertObjectToFormData;