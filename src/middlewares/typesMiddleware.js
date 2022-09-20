import { FETCH_TYPES_LIST, FETCH_PUT_TYPE, FETCH_DELETE_TYPE, FETCH_CREATE_TYPE, actionSetTypesList, actionFetchTypesList } from '../actions/types';
import { requestFetchTypesList, requestFetchDeleteType, requestFetchPutType, requestFetchCreateType } from '../requests/typesRequests';
import Swal from 'sweetalert2';

const typesMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_TYPES_LIST: {
      const response = await requestFetchTypesList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Types in "list" attribute
          actionSetTypesList(response.data)
        );
      }
      return;
    }
    case FETCH_DELETE_TYPE: {
      const response = await requestFetchDeleteType(action.payload);
      if (response.status === 204) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Type supprimé!',
        })
        store.dispatch(
          // get a fresh list of Types
          actionFetchTypesList()
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vous ne pouvez pas supprimer ce type car il est utilisé!',
        })
      }
      return;
    }
    case FETCH_PUT_TYPE: {
      const response = await requestFetchPutType(action.payload);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Type modifié!',
        })
        store.dispatch(
          // get a fresh list of Units
          actionFetchTypesList()
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Problème lors de la modification du type',
        })
      }
      return;
    }
    case FETCH_CREATE_TYPE: {
      const response = await requestFetchCreateType(action.payload);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Type créé!',
        })
        store.dispatch(
          // get a fresh list of Types
          actionFetchTypesList()
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Problème lors de la création du type!',
        })
      }
      return;
    }
    default:
      next(action);
  }
};

export default typesMiddleware;
