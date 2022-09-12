export const FETCH_INGREDIENTS_LIST = 'FETCH_INGREDIENTS_LIST';
export const SET_INGREDIENTS_LIST = 'SET_INGREDIENTS_LIST';

/**
 * Get the list of ingredients from API
 * @returns {Action}
 */
export function actionFetchIngredientsList() {
    return { type: FETCH_INGREDIENTS_LIST };
}

/**
 * Update list of ingredients from API
 * @returns {Action}
 */
export function actionSetIngredientsList(ingredientsList) {
    return { type: SET_INGREDIENTS_LIST, payload: ingredientsList };
}

