import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import recipesMiddleware from '../middlewares/recipesMiddleware';
import unitsMiddleware from '../middlewares/unitsMiddleware';
import ingredientsMiddleware from '../middlewares/ingredientsMiddleware';
import basketMiddleware from '../middlewares/basketMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(recipesMiddleware, unitsMiddleware, ingredientsMiddleware, basketMiddleware),
);

const store = createStore(reducer, enhancers);

export default store;
