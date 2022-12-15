import { UPDATE_USER, LOGOUT } from '../actions/login';
import { setBearerToken, removeBearerToken } from '../requests';

export const initialState = {
  user: { logged: false },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER:
      delete action.payload.password;
      setBearerToken(action.payload.token)
      return {
        logged: true,
        ...action.payload,
      };
    case LOGOUT: {
      removeBearerToken();
      return {
        logged: false
      }
    }
    default:
      return state;
  }
};

export default reducer;