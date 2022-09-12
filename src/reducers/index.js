import { combineReducers } from 'redux';
import recipesReducer from './recipes';
import unitsReducer from './units';
import ingredientsReducer from './ingredients';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  units: unitsReducer,
  ingredients: ingredientsReducer
});

export default rootReducer;
