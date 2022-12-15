import { combineReducers } from 'redux';
import recipesReducer from './recipes';
import unitsReducer from './units';
import typesReducer from './types';
import ingredientsReducer from './ingredients';
import basketReducer from './basket';
import loginReducer from './login';


const rootReducer = combineReducers({
  recipes: recipesReducer,
  units: unitsReducer,
  types: typesReducer,
  ingredients: ingredientsReducer,
  basket: basketReducer,
  login: loginReducer
});

export default rootReducer;
