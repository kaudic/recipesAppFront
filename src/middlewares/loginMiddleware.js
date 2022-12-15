import { LOG_IN, actionUpdateUserDetails } from '../actions/login';
import { requestFetchLogin } from '../requests/loginRequests';
import Swal from 'sweetalert2';
import { setBearerToken, removeBearerToken, getLocalBearerToken } from '../requests';

const loginMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case LOG_IN: {
      const response = await requestFetchLogin(action.payload);
      if (response.status === 200) {
        store.dispatch(
          // get credentials from back 
          actionUpdateUserDetails(response.data)
        );

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Problème lors de la connexion',
        })
      }
      return;
    }

    default:
      next(action);
  }
};

export default loginMiddleware;
