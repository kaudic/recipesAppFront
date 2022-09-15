export const FETCH_BASKET_LIST = 'FETCH_BASKET_LIST';
export const SET_BASKET_LIST = 'SET_BASKET_LIST';
export const FETCH_DELETEALL_BASKET = 'FETCH_DELETEALL_BASKET';
export const FETCH_ADDONE_BASKET = 'FETCH_ADDONE_BASKET';
export const FETCH_DELETEONE_BASKET = 'FETCH_DELETEONE_BASKET';

/**
 * Get the list of recipes in basket + counts
 * @returns {Action}
 */
export function actionFetchBasketList() {
    return { type: FETCH_BASKET_LIST };
}

/**
 * Delete all recipes from the basket
 * @returns {Action}
 */
export function actionFetchDeleteAllBasket() {
    return { type: FETCH_DELETEALL_BASKET };
}

/**
 * Update list of recipes in Basket in Redux store
 * @returns {Action}
 */
export function actionSetBasketList(basketList) {
    return { type: SET_BASKET_LIST, payload: basketList };
}

/**
 * Add one recipe in the basket
 * @returns {Action}
 */
export function actionFetchAddOneBasket(recipeId) {
    return { type: FETCH_ADDONE_BASKET, payload: recipeId };
}

/**
 * Delete one recipe from the basket
 * @returns {Action}
 */
export function actionFetchDeleteOneBasket(recipeId) {
    return { type: FETCH_DELETEONE_BASKET, payload: recipeId };
}

