export const FETCH_UNITS_LIST = 'FETCH_UNITS_LIST';
export const SET_UNITS_LIST = 'SET_UNITS_LIST';

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

