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

export async function requestFetchDeleteUnit(unitId) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.delete(`/units/${unitId}`);
        return response;
    }
    catch (err) {
        return err.message;
    }
}

export async function requestFetchPutUnit(updatedUnit) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.put(`/units`, updatedUnit);
        return response;
    }
    catch (err) {
        return err.message;
    }
}

export async function requestFetchCreateUnit(newUnit) {
    try {
        // BASE_URL/api defined by default in apiAxios
        const response = await apiAxios.post(`/units`, newUnit);
        return response;
    }
    catch (err) {
        return err.message;
    }
}