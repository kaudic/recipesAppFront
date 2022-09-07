
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
