import {
  FETCH_RECIPES_LIST, actionSetRecipesList, actionSetSearchList
} from '../actions/recipes';
import { requestFetchRecipesList } from '../requests/recipesRequests';

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


    default:
      next(action);
  }
};

export default recipesMiddleware;
