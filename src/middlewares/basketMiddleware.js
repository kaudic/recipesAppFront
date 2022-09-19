import { FETCH_BASKET_LIST, SET_BASKET_LIST, FETCH_DELETEALL_BASKET, FETCH_ADDONE_BASKET, FETCH_DELETEONE_BASKET } from '../actions/basket';
import { requestFetchDeleteOneBasket, requestFetchAddOneBasket, requestFetchDeleteAllBasket, requestFetchBasketList } from '../requests/basketRequests';
import { actionSetBasketList, actionFetchBasketList } from '../actions/basket';
import { actionFetchRecipesList } from '../actions/recipes';
import Swal from 'sweetalert2';

const basketMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_BASKET_LIST: {
      const response = await requestFetchBasketList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Units in "list" attribute
          actionSetBasketList(response.data)
        );
      }
      return;
    }
    case FETCH_DELETEALL_BASKET: {
      const response = await requestFetchDeleteAllBasket();
      if (response.status === 204) {
        store.dispatch(
          // get a fresh list of the basket
          actionFetchBasketList()
        );
        // get a fresh recipes list
        store.dispatch(
          actionFetchRecipesList()
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors de la suppression du panier',
        })
      }
      return;
    }
    case FETCH_ADDONE_BASKET: {
      const response = await requestFetchAddOneBasket(action.payload);
      if (response.status === 200) {
        store.dispatch(
          // get a fresh list of the basket
          actionFetchBasketList()
        );
        // get a fresh recipes list
        store.dispatch(
          actionFetchRecipesList()
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Problème lors de l\'ajout de la recette au panier!',
        })
      }
      return;
    }
    case FETCH_DELETEONE_BASKET: {
      const response = await requestFetchDeleteOneBasket(action.payload);
      if (response.status === 204) {
        // get a fresh list of the basket
        store.dispatch(
          actionFetchBasketList()
        );
        // get a fresh recipes list
        store.dispatch(
          actionFetchRecipesList()
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Problème lors de la suppression de la recette du panier!',
        })
      }
      return;
    }
    default:
      next(action);
  }
};

export default basketMiddleware;
