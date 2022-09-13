/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestFetchRecipesList() {
  try {
    // BASE_URL/api defined by default in apiAxios
    const response = await apiAxios.get('/recipes');
    return response;
  }
  catch (err) {
    return err.message;
  }
}

export async function requestFetchDeleteRecipe(recipeId) {
  try {
    // BASE_URL/api defined by default in apiAxios
    const response = await apiAxios.delete(`/recipes/${recipeId}`);
    return response;
  }
  catch (err) {
    return err.message;
  }
}

export async function requestFetchPutRecipe(modifiedRecipe) {
  try {
    // BASE_URL/api defined by default in apiAxios
    const response = await apiAxios.put(`/recipes`, modifiedRecipe);
    return response;
  }
  catch (err) {
    return err.message;
  }
}

export async function requestFetchCreateRecipe(newRecipe) {
  try {
    // BASE_URL/api defined by default in apiAxios
    const response = await apiAxios.post(`/recipes`, newRecipe);
    return response;
  }
  catch (err) {
    return err.message;
  }
}

export async function requestFetchPutImage(imgData) {
  try {
    // BASE_URL/api defined by default in apiAxios
    const response = await apiAxios.put(`/recipes/uploadImage`, imgData);
    return response;
  }
  catch (err) {
    return err.message;
  }
}