import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import FormsTabs from '../FormsTabs/FormsTabs';
import RecipeForm from '../RecipeForm/RecipeForm';
import { useSelector } from 'react-redux';
import './forms.scss';

const Forms = () => {
    // Get datas from the redux store
    const units = useSelector((state) => state.units.list);
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
                {tabsValue === 0 && <RecipeForm units={units} ingredientsList={ingredients} creationMode={true} />}

            </div>
        </>

    )
}

Forms.propTypes = {};

export default Forms;