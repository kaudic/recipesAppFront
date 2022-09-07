import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import recipesMiddleware from '../middlewares/recipesMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(recipesMiddleware),
);

const store = createStore(reducer, enhancers);

export default store;
