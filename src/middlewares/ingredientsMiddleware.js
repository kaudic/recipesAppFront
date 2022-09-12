import { FETCH_INGREDIENTS_LIST, actionSetIngredientsList } from '../actions/ingredients';
import { requestFetchIngredientsList } from '../requests/ingredientsRequests';

const ingredientsMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_LIST: {
      const response = await requestFetchIngredientsList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Recipes in "list" attribute
          actionSetIngredientsList(response.data)
        );
      }
      return;
    }
    default:
      next(action);
  }
};

export default ingredientsMiddleware;
