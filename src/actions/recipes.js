export const SET_RECIPES_LIST = 'SET_RECIPES_LIST';
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
export const FETCH_RECIPES_LIST = 'FETCH_RECIPES_LIST';

/**
 * Store the array of recipes in Redux Store
 * @param {Array<Object>} recipes list of recipes
 * @returns {Action}
 */
export function actionSetRecipesList(recipes) {
  return { type: SET_RECIPES_LIST, payload: recipes };
}

/**
 * Get the list of recipes from API
 * @returns {Action}
 */
export function actionFetchRecipesList() {
  return { type: FETCH_RECIPES_LIST };
}

/**
 * Store in Redux Store the array of recipes corresponding to the search String 
 * @param {Array<Object>} recipes list of searched recipes
 * @returns {Action}
 */
export function actionSetSearchList(searchRecipes) {
  return { type: SET_SEARCH_LIST, payload: searchRecipes };
}

