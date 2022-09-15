export const FETCH_UNITS_LIST = 'FETCH_UNITS_LIST';
export const SET_UNITS_LIST = 'SET_UNITS_LIST';
export const FETCH_DELETE_UNIT = 'FETCH_DELETE_UNIT';
export const FETCH_PUT_UNIT = 'FETCH_PUT_UNIT';
export const FETCH_CREATE_UNIT = 'FETCH_CREATE_UNIT';


/**
 * Get the list of units from API
 * @returns {Action}
 */
export function actionFetchUnitsList() {
    return { type: FETCH_UNITS_LIST };
}

/**
 * Update list of units from API
 * @returns {Action}
 */
export function actionSetUnitsList(unitsList) {
    return { type: SET_UNITS_LIST, payload: unitsList };
}

/**
 * Delete unit in  API
 * @returns {Action}
 */
export function actionFetchDeleteUnit(unitId) {
    return { type: FETCH_DELETE_UNIT, payload: unitId };
}

/**
 * Update unit in  API
 * @returns {Action}
 */
export function actionFetchPutUnit(updatedUnit) {
    return { type: FETCH_PUT_UNIT, payload: updatedUnit };
}

/**
 * Create unit in  API
 * @returns {Action}
 */
export function actionFetchCreateUnit(newUnit) {
    return { type: FETCH_CREATE_UNIT, payload: newUnit };
}








