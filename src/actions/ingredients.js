export const FETCH_INGREDIENTS_LIST = 'FETCH_INGREDIENTS_LIST';
export const SET_INGREDIENTS_LIST = 'SET_INGREDIENTS_LIST';
export const FETCH_DELETE_INGREDIENT = 'FETCH_DELETE_INGREDIENTS';
export const FETCH_PUT_INGREDIENT = 'FETCH_PUT_INGREDIENT';
export const FETCH_CREATE_INGREDIENT = 'FETCH_CREATE_INGREDIENT';

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

/**
 * delete in API one Ingredient
 * @returns {Action}
 */
export function actionFetchDeleteIngredient(ingredientId) {
    return { type: FETCH_DELETE_INGREDIENT, payload: ingredientId };
}

/**
 * update in API one Ingredient
 * @returns {Action}
 */
export function actionFetchPutIngredient(updatedIngredient) {
    return { type: FETCH_PUT_INGREDIENT, payload: updatedIngredient };
}

/**
 * Create a new ingredient using the API
 * @returns {Action}
 */
export function actionFetchCreateIngredient(newIngredient) {
    return { type: FETCH_CREATE_INGREDIENT, payload: newIngredient };
}