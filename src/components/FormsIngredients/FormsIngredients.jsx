import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './formsIngredients.scss';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import IngredientList from '../IngredientList/IngredientList';
import IngredientDialogBox from '../IngredientDialogBox/IngredientDialogBox';
import { actionFetchCreateIngredient, actionFetchPutIngredient, actionFetchDeleteIngredient } from '../../actions/ingredients'
import filterArray from '../../Tools/filterArray';

const FormsIngredients = ({
    units,
    ingredients,

}) => {

    const dispatch = useDispatch();

    // States for ingredients dialog box
    const [ingredientInputValue, setIngredientInputValue] = useState('');
    const [unitValue, setUnitValue] = useState(null);
    const [name, setName] = useState('');
    const [ingregientDialBoxOpen, setIngregientDialBoxOpen] = useState(false);

    // States for the search inputs
    const [searchIngredientsString, setSearchIngredientsString] = useState('');
    const [searchIngredients, setSearchIngredients] = useState();

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
        // API call to create a new ingredient
        dispatch(actionFetchCreateIngredient(newIngredient));
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelDialogBoxState();
    };

    // function to initialize the states of the ingredients dialogbox after it closes
    const cancelDialogBoxState = () => {
        setIngredientInputValue('');
        setUnitValue(null);
    };

    // function for dialog box to get the default unit id from chosen ingredient and pass it to the unit autocomplete
    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    // function for dialog box to handle change of unit 
    const handleChangeOfUnit = (event, value) => {
        setUnitValue(value);
    };

    // function to display a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickOpen = () => {
        setIngregientDialBoxOpen(true);
    };

    // function to filter the ingredients on screen
    const handleIngredientsSearchOnChange = (event) => {
        setSearchIngredientsString(event.target.value);
    }

    // function for ingredient management Tab - update ingredient default unit
    const updateIngredientsUnitChange = (id, mainUnitId, name) => {
        const updatedIngredient = { id, "ingredient": { name, mainUnitId } };
        dispatch(actionFetchPutIngredient(updatedIngredient));
    }

    // function for ingredient management Tab - delete ingredient from list
    const deleteIngredient = (ingredientId) => {
        dispatch(actionFetchDeleteIngredient(ingredientId));
    }

    useEffect(() => {
        if (searchIngredientsString !== '') {
            const searchIngredients = filterArray(ingredients, searchIngredientsString);
            setSearchIngredients(searchIngredients)
        } else {
            setSearchIngredients(ingredients)
        }
    }, [searchIngredientsString, ingredients])

    return (
        <div className="forms-ingredient">
            <TextField onChange={handleIngredientsSearchOnChange} placeholder="Rechercher un ingrédient" focused />
            <IngredientList
                handleIngredientDialBoxClickOpen={handleIngredientDialBoxClickOpen}
                ingredients={searchIngredients}
                searchString={searchIngredientsString}
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
        </div>
    )
}

FormsIngredients.propTypes = {};

export default FormsIngredients;