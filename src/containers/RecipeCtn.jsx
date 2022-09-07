import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findRecipeByPk } from '../selectors/recipes';
import Recipe from '../components/Recipe/Recipe';

const RecipeCtn = () => {
    // Getting the recipe information to display
    const { id: recipeId } = useParams();
    const recipe = useSelector((state) => findRecipeByPk(state.recipes.list, recipeId));

    return (
        <Recipe recipe={recipe} />
    )
}

RecipeCtn.propTypes = {}

export default RecipeCtn;