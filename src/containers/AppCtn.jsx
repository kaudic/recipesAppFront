import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionFetchRecipesList } from '../actions/recipes';
import { actionFetchUnitsList } from '../actions/units';
import { actionFetchTypesList } from '../actions/types';
import { actionFetchIngredientsList } from '../actions/ingredients';
import { actionFetchBasketList, actionSetBasketList } from '../actions/basket';

import App from '../components/App/App';

const AppCtn = () => {
    const dispatch = useDispatch();

    // eslint asked me to remove async before the callback and add dispatch as a dependency;
    dispatch(actionSetBasketList());
    useEffect(() => {
        dispatch(actionFetchRecipesList());
        dispatch(actionFetchUnitsList());
        dispatch(actionFetchTypesList());
        dispatch(actionFetchIngredientsList());
        dispatch(actionFetchBasketList());
    }, [dispatch]);

    return (
        <App />
    )
}

AppCtn.defaultProps = {};

export default React.memo(AppCtn);