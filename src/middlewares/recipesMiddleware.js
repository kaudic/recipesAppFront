import {
  FETCH_RECIPES_LIST, FETCH_DELETE_RECIPE, FETCH_PUT_RECIPE,
  actionSetRecipesList, actionSetSearchList, actionSetDeleteRecipe, actionSetPutRecipe
} from '../actions/recipes';
import { requestFetchRecipesList, requestFetchDeleteRecipe, requestFetchPutRecipe } from '../requests/recipesRequests';

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

    default:
      next(action);
  }
};

export default recipesMiddleware;
