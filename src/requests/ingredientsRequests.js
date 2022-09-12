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