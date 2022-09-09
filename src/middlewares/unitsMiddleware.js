import { FETCH_UNITS_LIST, actionSetUnitsList } from '../actions/units';
import { requestFetchUnitsList } from '../requests/unitsRequests';

const unitsMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_UNITS_LIST: {
      const response = await requestFetchUnitsList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Recipes in "list" attribute
          actionSetUnitsList(response.data)
        );
      }
      return;
    }
    default:
      next(action);
  }
};

export default unitsMiddleware;
