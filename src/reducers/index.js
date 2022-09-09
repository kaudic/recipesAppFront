import { combineReducers } from 'redux';
import recipesReducer from './recipes';
import unitsReducer from './units';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  units: unitsReducer
});

export default rootReducer;
