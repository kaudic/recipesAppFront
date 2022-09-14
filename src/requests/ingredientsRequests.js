import apiAxios from './index';

export async function requestFetchIngredientsList() {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.get('/ingredients');
        return response;
    }
    catch (err) {
        return err.message;
    }
}

export async function requestFetchDeleteIngredient(ingredientId) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.delete(`/ingredients/${ingredientId}`);
        return response;
    }
    catch (err) {
        return err.message;
    }
}

export async function requestFetchPutIngredient(updatedIngredient) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.put(`/ingredients`, updatedIngredient);
        return response;
    }
    catch (err) {
        return err.message;
    }
}