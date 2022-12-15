import { FETCH_UNITS_LIST, FETCH_PUT_UNIT, FETCH_DELETE_UNIT, FETCH_CREATE_UNIT, actionSetUnitsList, actionFetchUnitsList } from '../actions/units';
import { requestFetchUnitsList, requestFetchDeleteUnit, requestFetchPutUnit, requestFetchCreateUnit } from '../requests/unitsRequests';
import Swal from 'sweetalert2';

const unitsMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_UNITS_LIST: {
      const response = await requestFetchUnitsList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Units in "list" attribute
          actionSetUnitsList(response.data)
        );
      }
      return;
    }
    case FETCH_DELETE_UNIT: {
      const response = await requestFetchDeleteUnit(action.payload);
      if (response.status === 204) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Unité supprimée!',
        })
        store.dispatch(
          // get a fresh list of Units
          actionFetchUnitsList()
        );
      } else if (response === 'Request failed with status code 401') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Vous n'avez pas les autorisations pour effectuer cette action`,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vous ne pouvez pas supprimer cette unité car elle est utilisée!',
        })
      }
      return;
    }
    case FETCH_PUT_UNIT: {
      const response = await requestFetchPutUnit(action.payload);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Unité modifiée!',
        })
        store.dispatch(
          // get a fresh list of Units
          actionFetchUnitsList()
        );
      } else if (response === 'Request failed with status code 401') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Vous n'avez pas les autorisations pour effectuer cette action`,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Problème lors de la modification de l\'unité',
        })
      }
      return;
    }
    case FETCH_CREATE_UNIT: {
      const response = await requestFetchCreateUnit(action.payload);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Unité créée!',
        })
        store.dispatch(
          // get a fresh list of Units
          actionFetchUnitsList()
        );
      } else if (response === 'Request failed with status code 401') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Vous n'avez pas les autorisations pour effectuer cette action`,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Problème lors de la création de l\'unité!',
        })
      }
      return;
    }
    default:
      next(action);
  }
};

export default unitsMiddleware;
