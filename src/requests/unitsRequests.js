import apiAxios from './index';

export async function requestFetchUnitsList() {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.get('/units');
        return response;
    }
    catch (err) {
        return err.message;
    }
}