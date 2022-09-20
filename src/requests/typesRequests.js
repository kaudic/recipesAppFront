import apiAxios from './index';

export async function requestFetchTypesList() {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.get('/types');
        return response;
    }
    catch (err) {
        return err.message;
    }
}

export async function requestFetchDeleteType(typeId) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.delete(`/types/${typeId}`);
        return response;
    }
    catch (err) {
        return err.message;
    }
}

export async function requestFetchPutType(updatedType) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.put(`/types`, updatedType);
        return response;
    }
    catch (err) {
        return err.message;
    }
}

export async function requestFetchCreateType(newType) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.post(`/types`, newType);
        return response;
    }
    catch (err) {
        return err.message;
    }
}