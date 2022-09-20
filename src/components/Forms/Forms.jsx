import React, { useState } from 'react';
import Menu from '../Menu/Menu';
import FormsTabs from '../FormsTabs/FormsTabs';
import RecipeForm from '../RecipeForm/RecipeForm';
import { useSelector } from 'react-redux';
import './forms.scss';
import FormsIngredients from '../FormsIngredients/FormsIngredients';
import FormsUnits from '../FormsUnits/FormsUnits';

const Forms = () => {

    // Get datas from the redux store
    const units = useSelector((state) => state.units.list);
    const types = useSelector((state) => (state.types.list));
    const ingredients = useSelector((state) => state.ingredients.list);

    // State for the value - it represents the selected entry of the side menu
    const [tabsValue, setTabsValue] = useState(0);

    // On click on a tab the value will be updated
    const handleTabsChange = (event, value) => {
        setTabsValue(value);
    }

    return (
        <>
            <Menu />
            <div className="forms">
                <FormsTabs handleTabsChange={handleTabsChange} tabsValue={tabsValue} />
                {tabsValue === 0 && <RecipeForm units={units} types={types} ingredientsList={ingredients} creationMode={true} />}
                {tabsValue === 1 && <FormsIngredients units={units} ingredients={ingredients} />}
                {tabsValue === 2 && <FormsUnits units={units} />}
            </div>
        </>
    )
}

export default React.memo(Forms);