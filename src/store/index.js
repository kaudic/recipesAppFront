import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import recipesMiddleware from '../middlewares/recipesMiddleware';
import unitsMiddleware from '../middlewares/unitsMiddleware';
import typesMiddleware from '../middlewares/typesMiddleware';
import ingredientsMiddleware from '../middlewares/ingredientsMiddleware';
import basketMiddleware from '../middlewares/basketMiddleware';
import loginMiddleware from '../middlewares/loginMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(recipesMiddleware, unitsMiddleware, typesMiddleware, ingredientsMiddleware, basketMiddleware, loginMiddleware),
);

const store = createStore(reducer, enhancers);

export default store;
