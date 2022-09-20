import { combineReducers } from 'redux';
import recipesReducer from './recipes';
import unitsReducer from './units';
import typesReducer from './types';
import ingredientsReducer from './ingredients';
import basketReducer from './basket';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  units: unitsReducer,
  types: typesReducer,
  ingredients: ingredientsReducer,
  basket: basketReducer
});

export default rootReducer;
