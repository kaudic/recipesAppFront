import {
  FETCH_RECIPES_LIST, FETCH_DELETE_RECIPE, FETCH_PUT_RECIPE, FETCH_PUT_IMG, FETCH_CREATE_RECIPE,
  actionSetRecipesList, actionSetSearchList, actionSetDeleteRecipe, actionSetPutRecipe, actionSetPutImg, actionFetchRecipesList, actionFetchPutImage
} from '../actions/recipes';
import { requestFetchRecipesList, requestFetchDeleteRecipe, requestFetchPutRecipe, requestFetchPutImage, requestFetchCreateRecipe } from '../requests/recipesRequests';
import convertObjectToFormData from '../Tools/convertObjectToFormData';
import Swal from 'sweetalert2';

const recipesMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_RECIPES_LIST: {
      const response = await requestFetchRecipesList();
      if (response.status === 200) {
        store.dispatch(
          // storing in Redux Store the full list of Recipes in "list" attribute
          actionSetRecipesList(response.data),
        );
        store.dispatch(
          // storing in Redux Store the full list of Recipes in "searchList" attribute
          actionSetSearchList(response.data),
        );
      }
      return;
    }
    case FETCH_DELETE_RECIPE: {
      const response = await requestFetchDeleteRecipe(action.payload);
      if (response.status === 204) {
        store.dispatch(actionSetDeleteRecipe(action.payload));
      }
      return;
    }
    case FETCH_PUT_RECIPE: {
      const response = await requestFetchPutRecipe(action.payload);
      if (response.status === 200) {
        store.dispatch(actionFetchRecipesList());
      }
      return;
    }
    case FETCH_CREATE_RECIPE: {
      const response = await requestFetchCreateRecipe(action.payload);
      // if an imgData was sent then we complete it with the newly id got after recipe creation
      if (response.status === 200) {
        // message to confirm creation to the user
        Swal.fire({
          icon: 'success',
          title: 'Recette créée!',
          showConfirmButton: false,
          timer: 1500
        })
        if (action.imgData) {
          action.imgData.recipeId = response.data.id
          // and then we make the API call through a redux middleware to update the image
          store.dispatch(actionFetchPutImage(convertObjectToFormData(action.imgData)));
        }
        // we make another call to get all recipes after a slight timeout so that the update of image is fully finished
        setTimeout(() => store.dispatch(actionFetchRecipesList()), 500);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur lors de la création de la recette',
        })
      }
      return;
    }
    case FETCH_PUT_IMG: {
      const response = await requestFetchPutImage(action.payload);
      if (response.status === 200) {
        store.dispatch(actionSetPutImg({
          recipeId: response.data.result.id,
          imgName: response.data.result.img_name
        }));
      }
      return;
    }

    default:
      next(action);
  }
};

export default recipesMiddleware;
