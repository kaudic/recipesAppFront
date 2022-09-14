import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import FormsTabs from '../FormsTabs/FormsTabs';
import RecipeForm from '../RecipeForm/RecipeForm';
import { useSelector, useDispatch } from 'react-redux';
import './forms.scss';
import IngredientList from '../IngredientList/IngredientList';
import IngredientDialogBox from '../IngredientDialogBox/IngredientDialogBox';
import { actionFetchDeleteIngredient, actionFetchPutIngredient } from '../../actions/ingredients';

const Forms = () => {
    const dispatch = useDispatch();

    // Get datas from the redux store
    const units = useSelector((state) => state.units.list);
    const ingredients = useSelector((state) => state.ingredients.list);

    // State for the value - it represents the selected entry of the side menu
    const [tabsValue, setTabsValue] = useState(0);

    // States for dialog box
    const [ingregientDialBoxOpen, setIngregientDialBoxOpen] = useState(false);
    const [ingredientInputValue, setIngredientInputValue] = useState('');
    const [unitValue, setUnitValue] = useState(null);
    const [name, setName] = useState('');


    // function for dialog box to handle change of unit 
    const handleChangeOfUnit = (event, value) => {
        setUnitValue(value);
    };
    // function for dialog box to get the default unit id from chosen ingredient and pass it to the unit autocomplete
    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    // On click on a tab the value will be updated
    const handleTabsChange = (event, value) => {
        setTabsValue(value);
    }
    // function for ingredient management Tab - delete ingredient from list
    const deleteIngredient = (ingredientId) => {
        dispatch(actionFetchDeleteIngredient(ingredientId));
    }
    // function for ingredient management Tab - update ingredient default unit
    const updateIngredientsUnitChange = (id, mainUnitId, name) => {
        const updatedIngredient = { id, "ingredient": { name, mainUnitId } };
        dispatch(actionFetchPutIngredient(updatedIngredient));
    }
    // function to display a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickOpen = () => {
        setIngregientDialBoxOpen(true);
    };
    // function to initialize the states of the dialogbox after it closes
    const cancelDialogBoxState = () => {
        setIngredientInputValue('');
        setUnitValue(null);
    };
    // function to hide a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickClose = () => {
        setIngregientDialBoxOpen(false);
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelDialogBoxState();
    };

    // function to hide a dialogBox and send to API the creation of a new ingredient
    const handleIngredientDialBoxClickValidate = () => {
        setIngregientDialBoxOpen(false);
        const newIngredient = {
            name,
            mainUnitId: unitValue.id
        };

        // TODO API call to create a new ingredient
        console.log(newIngredient);

        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelDialogBoxState();
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
                            showQty={false}
                            enableIngredientName={true}
                            ingredientListClassName={"forms-ingredientList"}
                            ingredientFormClassName={"forms-ingredientList-ingredientForm"}
                        />
                        <IngredientDialogBox
                            title={"Créer un nouvel ingrédient"}
                            subtitle={"Choisir un ingrédient dans la liste puis indiquer une unité par défaut"}
                            handleIngredientDialBoxClickClose={handleIngredientDialBoxClickClose}
                            handleIngredientDialBoxClickValidate={handleIngredientDialBoxClickValidate}
                            ingregientDialBoxOpen={ingregientDialBoxOpen}
                            units={units}
                            ingredientsList={ingredients}
                            handleChangeOfUnit={handleChangeOfUnit}
                            ingredientInputValue={ingredientInputValue}
                            unitValue={unitValue}
                            showQty={false}
                            name={name}
                            ingredientAutocomplete={false}
                            handleChangeName={handleChangeName}
                        />
                    </div>}

            </div>
        </>

    )
}

Forms.propTypes = {};

export default Forms;