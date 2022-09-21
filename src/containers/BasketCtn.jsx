import React from 'react';
import PropTypes from 'prop-types';
import Basket from '../components/Basket/Basket';
import { useSelector, useDispatch } from 'react-redux';
import { actionFetchDeleteOneBasket, actionFetchDeleteAllBasket } from '../actions/basket';

const BasketCtn = () => {
    const dispatch = useDispatch();

    // Get indicators counts
    const recipesCount = useSelector((state) => state?.basket?.list?.recipesCount[0]?.count || 0);
    const mealsCount = useSelector((state) => state?.basket?.list?.mealsCount[0]?.sum || 0);

    // Get all recipes in the basket
    const recipesBasketList = useSelector((state) => state.basket.list);
    const recipes = recipesBasketList.recipes;

    // Function to dispatch an action to delete recipe from the basket
    const handleDispatchDeleteOneBasket = (recipeId) => {
        dispatch(actionFetchDeleteOneBasket(recipeId));
    }

    // Function to dispatch an action to delete all recipes from the basket
    const handleDeleteBasketClick = async () => {
        dispatch(actionFetchDeleteAllBasket());
    }

    return (
        <Basket
            recipesCount={recipesCount}
            mealsCount={mealsCount}
            recipes={recipes}
            handleDispatchDeleteOneBasket={handleDispatchDeleteOneBasket}
            handleDeleteBasketClick={handleDeleteBasketClick}
        />
    )
}

BasketCtn.propTypes = {};

export default React.memo(BasketCtn);