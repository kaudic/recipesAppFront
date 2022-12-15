export const LOG_IN = 'LOG_IN';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT = 'LOGOUT';

/**
 * Try to log in
 * @returns {Action}
 */
export function actionFetchLogin(credentials) {
    return { type: LOG_IN, payload: credentials };
}

export function actionUpdateUserDetails(userCredentials) {
    return { type: UPDATE_USER, payload: userCredentials };
}

export function actionLogout() {
    return { type: LOGOUT };
}








