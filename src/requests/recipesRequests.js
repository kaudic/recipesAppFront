/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestFetchRecipesList() {
  try {
    // http://localhost:3001/api defined by default in apiAxios
    const response = await apiAxios.get('/recipes');
    return response;
  }
  catch (err) {
    return err.message;
  }
}

export async function requestFetchDeleteRecipe(recipeId) {
  try {
    // http://localhost:3001/api defined by default in apiAxios
    const response = await apiAxios.delete(`/recipes/${recipeId}`);
    return response;
  }
  catch (err) {
    return err.message;
  }
}

export async function requestFetchPutRecipe(modifiedRecipe) {
  try {
    // http://localhost:3001/api defined by default in apiAxios
    const response = await apiAxios.put(`/recipes`, modifiedRecipe);
    return response;
  }
  catch (err) {
    return err.message;
  }
}