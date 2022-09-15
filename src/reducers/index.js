import { combineReducers } from 'redux';
import recipesReducer from './recipes';
import unitsReducer from './units';
import ingredientsReducer from './ingredients';
import basketReducer from './basket';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  units: unitsReducer,
  ingredients: ingredientsReducer,
  basket: basketReducer
});

export default rootReducer;
