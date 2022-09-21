import React, { useState } from 'react';
import Menu from '../Menu/Menu';
import FormsTabs from '../FormsTabs/FormsTabs';
import RecipeForm from '../RecipeForm/RecipeForm';
import './forms.scss';
import FormsIngredients from '../FormsIngredients/FormsIngredients';
import FormsUnits from '../FormsUnits/FormsUnits';
import PropTypes from 'prop-types';

const Forms = ({
    units,
    types,
    ingredients
}) => {

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

Forms.propTypes = {
    units: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        short_name: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    types: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        main_unit_id: PropTypes.number.isRequired,
    })).isRequired,
};

export default React.memo(Forms);