import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { findRecipeByPk } from '../selectors/recipes';
import Recipe from '../components/Recipe/Recipe';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import { actionFetchDeleteRecipe, actionFetchRecipesList } from '../actions/recipes';

const RecipeCtn = () => {
    const dispatch = useDispatch();
    const [modify, setModify] = useState(false);

    // Getting the recipe and units information to display
    const { id: recipeId } = useParams();
    const recipe = useSelector((state) => findRecipeByPk(state.recipes.list, recipeId));
    const units = useSelector((state) => (state.units.list));
    const ingredientsList = useSelector((state) => (state.ingredients.list));


    // Function to handle the click on delete button
    const handleDeleteClick = (event) => {
        event.preventDefault();
        dispatch(actionFetchDeleteRecipe(recipeId));
    }

    // Function to handle the click on modify button
    const handleModifyClick = () => {
        setModify((oldState) => !oldState);
    }

    // Function to handle the click on cancel button
    const handleCancelClick = () => {
        setModify((oldState) => !oldState);
        dispatch(actionFetchRecipesList());
    }

    // Returning the JSX component
    if (!recipe) {
        return <Navigate to="/" replace />
    };

    return (modify ?
        <RecipeForm recipe={recipe} units={units} ingredientsList={ingredientsList} handleCancelClick={handleCancelClick} setModify={setModify} /> :
        <Recipe recipe={recipe} handleDeleteClick={handleDeleteClick} handleModifyClick={handleModifyClick} />)

}

RecipeCtn.propTypes = {}

export default React.memo(RecipeCtn);