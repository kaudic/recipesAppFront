export const FETCH_TYPES_LIST = 'FETCH_TYPES_LIST';
export const SET_TYPES_LIST = 'SET_TYPES_LIST';
export const FETCH_DELETE_TYPE = 'FETCH_DELETE_TYPE';
export const FETCH_PUT_TYPE = 'FETCH_PUT_TYPE';
export const FETCH_CREATE_TYPE = 'FETCH_CREATE_TYPE';


/**
 * Get the list of types from API
 * @returns {Action}
 */
export function actionFetchTypesList() {
    return { type: FETCH_TYPES_LIST };
}

/**
 * Update list of types from API
 * @returns {Action}
 */
export function actionSetTypesList(typesList) {
    return { type: SET_TYPES_LIST, payload: typesList };
}

/**
 * Delete type in  API
 * @returns {Action}
 */
export function actionFetchDeleteType(typeId) {
    return { type: FETCH_DELETE_TYPE, payload: typeId };
}

/**
 * Update type in  API
 * @returns {Action}
 */
export function actionFetchPutType(updatedType) {
    return { type: FETCH_PUT_TYPE, payload: updatedType };
}

/**
 * Create type in  API
 * @returns {Action}
 */
export function actionFetchCreateType(newType) {
    return { type: FETCH_CREATE_TYPE, payload: newType };
}








