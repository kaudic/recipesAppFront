import { FETCH_INGREDIENTS_LIST, FETCH_DELETE_INGREDIENT, FETCH_PUT_INGREDIENT, FETCH_CREATE_INGREDIENT, actionSetIngredientsList, actionFetchIngredientsList } from '../actions/ingredients';
import { requestFetchIngredientsList, requestFetchDeleteIngredient, requestFetchPutIngredient, requestFetchCreateIngredient } from '../requests/ingredientsRequests';
import Swal from 'sweetalert2';

const ingredientsMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_LIST: {
      const response = await requestFetchIngredientsList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Recipes in "list" attribute
          actionSetIngredientsList(response.data)
        );
      }
      return;
    }
    case FETCH_DELETE_INGREDIENT: {
      const response = await requestFetchDeleteIngredient(action.payload);
      if (response.status === 204) {
        store.dispatch(
          // fetching a new list from API after deleting one ingredient
          actionFetchIngredientsList()
        );
      } else if (response === 'Request failed with status code 401') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Vous n'avez pas les autorisations pour effectuer cette action`,
        })
      } else {
        // usually if status code = 500 it is because ingredient is used in recipe
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vous ne pouvez pas supprimer cet ingrédient car il est utilisé dans des recettes!',
        })
      }
      return;
    }
    case FETCH_PUT_INGREDIENT: {
      const response = await requestFetchPutIngredient(action.payload);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Ingrédient modifié!',
        })
        store.dispatch(
          // fetching a new list from API after updating one ingredient
          actionFetchIngredientsList()
        );
      } else if (response === 'Request failed with status code 401') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Vous n'avez pas les autorisations pour effectuer cette action`,
        })
      } else {
        // usually if status code = 500 it is because ingredient is used in recipe
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors de la modification de l\'unité principale de l\'ingrédient',
        })
      }
      return;
    }
    case FETCH_CREATE_INGREDIENT: {
      const response = await requestFetchCreateIngredient(action.payload);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Good job',
          text: 'Ingrédient créé!',
        })
        store.dispatch(
          // fetching a new list from API after updating one ingredient
          actionFetchIngredientsList()
        );
      } else if (response === 'Request failed with status code 401') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Vous n'avez pas les autorisations pour effectuer cette action`,
        })
      } else {
        // usually if status code = 500 it is because ingredient is used in recipe
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors de la création de l\'ingrédient',
        })
      }
      return;
    }
    default:
      next(action);
  }
};

export default ingredientsMiddleware;
