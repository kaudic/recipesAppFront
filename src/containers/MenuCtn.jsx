import React from 'react';
import Menu from '../components/Menu/Menu';
import { actionSetRandomRecipe } from '../actions/recipes';
import { useDispatch, useSelector } from 'react-redux';

const MenuCtn = () => {
    const dispatch = useDispatch();

    const recipeCount = useSelector((state) => parseInt(state?.basket?.list?.recipesCount[0]?.count) || 0);
    const handleShuffleClick = () => {
        dispatch(actionSetRandomRecipe());
    }

    return (
        <Menu
            recipeCount={recipeCount}
            handleShuffleClick={handleShuffleClick}
        />
    )
}

export default React.memo(MenuCtn);