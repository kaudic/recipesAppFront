import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import FormsTabs from '../FormsTabs/FormsTabs';
import RecipeForm from '../RecipeForm/RecipeForm';
import { useSelector } from 'react-redux';
import './forms.scss';
import IngredientList from '../IngredientList/IngredientList';

const Forms = () => {
    // Get datas from the redux store
    const units = useSelector((state) => state.units.list);
    const ingredients = useSelector((state) => state.ingredients.list);

    // State for the value - it represents the selected entry of the side menu
    const [tabsValue, setTabsValue] = useState(0);

    // States for dialog box
    const [ingregientDialBoxOpen, setIngregientDialBoxOpen] = useState(false);
    const [ingredientValue, setIngredientValue] = useState(null);
    const [ingredientInputValue, setIngredientInputValue] = useState('');
    const [unitValue, setUnitValue] = useState(null);

    // On click on a tab the value will be updated
    const handleTabsChange = (event, value) => {
        setTabsValue(value);
    }

    const deleteIngredient = () => {

    }
    const updateIngredientsUnitChange = () => {

    }
    // function to display a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickOpen = () => {
        setIngregientDialBoxOpen(true);
    };

    return (
        <>
            <Menu />
            <div className="forms">
                <FormsTabs handleTabsChange={handleTabsChange} tabsValue={tabsValue} />
                {tabsValue === 0 && <RecipeForm units={units} ingredientsList={ingredients} creationMode={true} />}
                {tabsValue === 1 &&
                    <div>


                        <IngredientList
                            handleIngredientDialBoxClickOpen={handleIngredientDialBoxClickOpen}
                            ingredients={ingredients}
                            units={units}
                            updateIngredientsUnitChange={updateIngredientsUnitChange}
                            deleteIngredient={deleteIngredient}
                            ingredientListClassName={"forms-ingredientList"}
                            showQty={false}
                            ingredientFormClassName={"forms-ingredientList-ingredientForm"}
                        />
                    </div>}

            </div>
        </>

    )
}

Forms.propTypes = {};

export default Forms;