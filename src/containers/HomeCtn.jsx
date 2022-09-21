import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionSetSearchList } from '../actions/recipes';
import Home from '../components/Home/Home';

const HomeCtn = () => {
    const dispatch = useDispatch();

    // Get datas from the redux store
    const recipes = useSelector((state) => state.recipes.list);
    const recipesSearchList = useSelector((state) => state.recipes.searchList);

    // Function to update the searchList
    const handleSetSearchList = (filteredRecipesFromCheckbox) => {
        dispatch(actionSetSearchList(filteredRecipesFromCheckbox));
    }

    return (
        <Home
            recipes={recipes}
            recipesSearchList={recipesSearchList}
            handleSetSearchList={handleSetSearchList}
        />
    )
}


export default React.memo(HomeCtn);