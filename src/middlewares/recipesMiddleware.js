import {
  FETCH_RECIPES_LIST, FETCH_DELETE_RECIPE, FETCH_PUT_RECIPE, FETCH_PUT_IMG, FETCH_CREATE_RECIPE,
  actionSetRecipesList, actionSetSearchList, actionSetDeleteRecipe, actionSetPutRecipe, actionSetPutImg, actionFetchRecipesList, actionFetchPutImage
} from '../actions/recipes';
import { requestFetchRecipesList, requestFetchDeleteRecipe, requestFetchPutRecipe, requestFetchPutImage, requestFetchCreateRecipe } from '../requests/recipesRequests';
import convertObjectToFormData from '../Tools/convertObjectToFormData';

const recipesMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_RECIPES_LIST: {
      const response = await requestFetchRecipesList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Recipes in "list" attribute
          actionSetRecipesList(response.data),
        );
        store.dispatch(
          // storing in Redux Store the full list of Recipes in "searchList" attribute
          actionSetSearchList(response.data),
        );
      }
      return;
    }
    case FETCH_DELETE_RECIPE: {
      const response = await requestFetchDeleteRecipe(action.payload);
      if (response.status === 204) {
        store.dispatch(actionSetDeleteRecipe(action.payload));
      }
      return;
    }
    case FETCH_PUT_RECIPE: {
      const response = await requestFetchPutRecipe(action.payload);
      if (response.status === 200) {
        store.dispatch(actionSetPutRecipe(response.data));
      }
      return;
    }
    case FETCH_CREATE_RECIPE: {
      const response = await requestFetchCreateRecipe(action.payload);
      // if an imgData was sent then we complete it with the newly id got after recipe creation
      if (response.status === 200) {
        if (action.imgData) {
          action.imgData.recipeId = response.data.id
          // making the API call through redux middleware
          store.dispatch(actionFetchPutImage(convertObjectToFormData(action.imgData)));
        }
        setTimeout(() => store.dispatch(actionFetchRecipesList()), 1000);
      }
      return;
    }
    case FETCH_PUT_IMG: {
      const response = await requestFetchPutImage(action.payload);
      if (response.status === 200) {
        store.dispatch(actionSetPutImg({
          recipeId: response.data.result.id,
          imgName: response.data.result.img_name
        }));
      }
      return;
    }

    default:
      next(action);
  }
};

export default recipesMiddleware;
