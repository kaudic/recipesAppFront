import { SET_RECIPES_LIST, SET_DELETE_RECIPE, SET_SEARCH_LIST, SET_PUT_RECIPE, SET_PUT_IMG } from '../actions/recipes';
import { deleteRecipeFromStateRecipes, updateRecipeFromStateRecipes, updateImgNameFromStateRecipes } from '../selectors/recipes';

export const initialState = {
  list: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECIPES_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case SET_SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload,
      };
    case SET_DELETE_RECIPE: {
      const recipeId = action.payload;
      const updatedState = { ...deleteRecipeFromStateRecipes(state, recipeId) };
      return updatedState;
    }
    case SET_PUT_RECIPE: {
      const modifiedRecipe = action.payload;
      const updatedState = { ...updateRecipeFromStateRecipes(state, modifiedRecipe) };
      return updatedState;
    }
    case SET_PUT_IMG: {
      const imgData = action.payload;
      const updatedState = { ...updateImgNameFromStateRecipes(state, imgData) };
      return updatedState;
    }

    default:
      return state;
  }
};

export default reducer;
