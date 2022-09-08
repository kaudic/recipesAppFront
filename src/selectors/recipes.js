
/**
 *  we look for a recipe in the whole list using the recipeId (got from params)
 * @param {Array} recipes - all recipes
 * @param {recipeId} recipeId - the id of the recipe we are looking for
 * @return {Object} - the found recipe
 */
export function findRecipeByPk(recipes, recipeId) {

  const recipe = recipes.find((recipe) => {
    return parseInt(recipe.id) === parseInt(recipeId);
  });

  return recipe;
}

/**
 *  we look for a recipe to DELETE in the whole list using the recipeId (got from params)
 * @param {Array} recipes - all recipes
 * @param {recipeId} recipeId - the id of the recipe we are looking for
 * @return {Object} - the found recipe
 */
export function deleteRecipeFromStateRecipes(state, recipeId) {

  for (const key in state) {
    const recipeIndex = state[key].findIndex((recipe) => {
      return parseInt(recipe.id) === parseInt(recipeId);
    });

    if (recipeIndex > -1) { // only splice array when item is found
      state[key].splice(recipeIndex, 1); // 2nd parameter means remove one item only
    }
  }

  return {
    ...state
  }

}

/**
 *  we look for a recipe to DELETE in the whole list using the recipeId (got from params)
 * @param {Array} recipes - all recipes
 * @param {recipeId} recipeId - the id of the recipe we are looking for
 * @return {Object} - the found recipe
 */
export function updateRecipeFromStateRecipes(state, modifiedRecipe) {

  for (const key in state) {
    const recipeIndex = state[key].findIndex((recipe) => {
      return parseInt(recipe.id) === parseInt(modifiedRecipe.id);
    });

    if (recipeIndex > -1) { // only update array if item is found
      state[key][recipeIndex] = modifiedRecipe;
    }
  }

  return {
    ...state
  }

}