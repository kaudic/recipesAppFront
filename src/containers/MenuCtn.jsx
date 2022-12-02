import React from 'react';
import Menu from '../components/Menu/Menu';
import { actionSetRandomRecipe } from '../actions/recipes';
import { useDispatch, useSelector } from 'react-redux';

const MenuCtn = ({
    updateTypeFilter,
    handleSearchOnChange
}) => {
    const dispatch = useDispatch();

    const recipeCount = useSelector((state) => parseInt(state?.basket?.list?.recipesCount[0]?.count) || 0);

    const handleShuffleClick = () => {
        dispatch(actionSetRandomRecipe());
    }

    console.log('Rendering Menu Ctn, value of recipeCount = '+recipeCount);

    return (
        <Menu
            recipeCount={recipeCount}
            handleShuffleClick={handleShuffleClick}
            updateTypeFilter={updateTypeFilter}
            handleSearchOnChange={handleSearchOnChange}
        />
    )
}

export default MenuCtn;