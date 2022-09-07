import { SET_RECIPES_LIST } from '../actions/recipes';
import { SET_SEARCH_LIST } from '../actions/recipes';

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

    default:
      return state;
  }
};

export default reducer;
