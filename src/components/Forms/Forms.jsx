import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import FormsTabs from '../FormsTabs/FormsTabs';
import RecipeForm from '../RecipeForm/RecipeForm';
import { useSelector, useDispatch } from 'react-redux';
import './forms.scss';
import IngredientList from '../IngredientList/IngredientList';
import IngredientDialogBox from '../IngredientDialogBox/IngredientDialogBox';
import { actionFetchDeleteIngredient, actionFetchPutIngredient, actionFetchCreateIngredient } from '../../actions/ingredients';
import { actionFetchDeleteUnit, actionFetchPutUnit, actionFetchCreateUnit } from '../../actions/units';
import filterArray from '../../Tools/filterArray';
import TextField from '@mui/material/TextField';
import UnitDialogBox from '../UnitDialogBox/UnitDialogBox';
import UnitList from '../UnitList/UnitList';

const Forms = () => {
    const dispatch = useDispatch();

    // Get datas from the redux store
    const units = useSelector((state) => state.units.list);
    const ingredients = useSelector((state) => state.ingredients.list);

    // State for the value - it represents the selected entry of the side menu
    const [tabsValue, setTabsValue] = useState(0);

    // States for the search inputs
    const [searchIngredientsString, setSearchIngredientsString] = useState('');
    const [searchIngredients, setSearchIngredients] = useState();
    const [searchUnitsString, setSearchUnitsString] = useState('');
    const [searchUnits, setSearchUnits] = useState();

    useEffect(() => {
        if (searchIngredientsString !== '') {
            const searchIngredients = filterArray(ingredients, searchIngredientsString);
            setSearchIngredients(searchIngredients)
        } else {
            setSearchIngredients(ingredients)
        }
    }, [searchIngredientsString, ingredients])

    useEffect(() => {
        if (searchUnitsString !== '') {
            const searchUnits = filterArray(units, searchUnitsString);
            setSearchUnits(searchUnits)
        } else {
            setSearchUnits(units)
        }
    }, [searchUnitsString, units])

    // function to filter the ingredients on screen
    const handleIngredientsSearchOnChange = (event) => {
        setSearchIngredientsString(event.target.value);
    }
    // function to filter the units on screen
    const handleUnitsSearchOnChange = (event) => {
        setSearchUnitsString(event.target.value);
    }

    // States for ingredients dialog box
    const [ingregientDialBoxOpen, setIngregientDialBoxOpen] = useState(false);
    const [ingredientInputValue, setIngredientInputValue] = useState('');
    const [unitValue, setUnitValue] = useState(null);
    const [name, setName] = useState('');

    // States for units dialog box
    const [unitDialBoxOpen, setUnitDialBoxOpen] = useState(false);
    const [unitNameInputValue, setUnitNameInputValue] = useState('');
    const [unitShortNameInputValue, setUnitShortNameInputValue] = useState('');

    // function for dialog box to handle change of unit 
    const handleChangeOfUnit = (event, value) => {
        setUnitValue(value);
    };
    // function for dialog box to get the default unit id from chosen ingredient and pass it to the unit autocomplete
    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    // function to change name of unit
    const handleChangeUnitName = (event) => {
        setUnitNameInputValue(event.target.value);
    }
    // function to change short name of unit
    const handleChangeUnitShortName = (event) => {
        setUnitShortNameInputValue(event.target.value);
    }

    // On click on a tab the value will be updated
    const handleTabsChange = (event, value) => {
        setTabsValue(value);
    }
    // function for ingredient management Tab - delete ingredient from list
    const deleteIngredient = (ingredientId) => {
        dispatch(actionFetchDeleteIngredient(ingredientId));
    }
    // function for unit management Tab - delete unit from list
    const deleteUnit = (unitId) => {
        dispatch(actionFetchDeleteUnit(unitId));
    }
    // function for ingredient management Tab - update ingredient default unit
    const updateIngredientsUnitChange = (id, mainUnitId, name) => {
        const updatedIngredient = { id, "ingredient": { name, mainUnitId } };
        dispatch(actionFetchPutIngredient(updatedIngredient));
    }
    // function for unit management Tab - update unit name and short name 
    const updateUnitChange = (id, unitNameInputValue, unitShortNameInputValue) => {
        const updatedUnit = { id, "unit": { name: unitNameInputValue, shortName: unitShortNameInputValue } };
        dispatch(actionFetchPutUnit(updatedUnit));
    }

    // function to display a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickOpen = () => {
        setIngregientDialBoxOpen(true);
    };
    // function to display a dialogBox to add Unit to the Unit List
    const handleUnitDialBoxClickOpen = () => {
        setUnitDialBoxOpen(true);
    };

    // function to initialize the states of the ingredients dialogbox after it closes
    const cancelDialogBoxState = () => {
        setIngredientInputValue('');
        setUnitValue(null);
    };
    // function to initialize the states of the units dialogbox after it closes
    const cancelUnitDialogBoxState = () => {
        setUnitNameInputValue('');
        setUnitShortNameInputValue('');
    };

    // function to hide a dialogBox to add Ingredient to the Recipe
    const handleIngredientDialBoxClickClose = () => {
        setIngregientDialBoxOpen(false);
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelDialogBoxState();
    };
    // function to hide a dialogBox to add Units to the Recipe
    const handleUnitDialBoxClickClose = () => {
        setUnitDialBoxOpen(false);
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelUnitDialogBoxState();
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

    // function to hide a dialogBox and send to API the creation of a new unit
    const handleUnitDialBoxClickValidate = () => {
        setUnitDialBoxOpen(false);
        const newUnit = {
            name: unitNameInputValue,
            shortName: unitShortNameInputValue
        };
        // API call to create a new unit
        dispatch(actionFetchCreateUnit(newUnit));
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelUnitDialogBoxState()
    };



    return (
        <>
            <Menu />
            <div className="forms">
                <FormsTabs handleTabsChange={handleTabsChange} tabsValue={tabsValue} />
                {tabsValue === 0 && <RecipeForm units={units} ingredientsList={ingredients} creationMode={true} />}
                {tabsValue === 1 &&
                    <div className="forms-ingredient">
                        <TextField onChange={handleIngredientsSearchOnChange} placeholder="Rechercher un ingrédient" />
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
                    </div>}
                {tabsValue === 2 &&
                    <div className="forms-unit">
                        <TextField onChange={handleUnitsSearchOnChange} placeholder="Rechercher une unité" />
                        <UnitList
                            units={searchUnits}
                            handleUnitDialBoxClickOpen={handleUnitDialBoxClickOpen}
                            searchString={searchUnitsString}
                            updateUnitChange={updateUnitChange}
                            deleteUnit={deleteUnit}
                            ingredientListClassName={"forms-unitList"}
                            ingredientFormClassName={"forms-unitList-unitForm"}
                        />
                        <UnitDialogBox
                            title={"Créer une nouvelle unité"}
                            subtitle={"Rentrer un nom d'unité et une abréviation"}
                            handleUnitDialBoxClickClose={handleUnitDialBoxClickClose}
                            handleUnitDialBoxClickValidate={handleUnitDialBoxClickValidate}
                            unitDialBoxOpen={unitDialBoxOpen}
                            units={units}
                            handleChangeUnitShortName={handleChangeUnitShortName}
                            handleChangeUnitName={handleChangeUnitName}
                            unitNameInputValue={unitNameInputValue}
                            unitShortNameInputValue={unitShortNameInputValue}
                        />
                    </div>}
            </div>
        </>

    )
}

Forms.propTypes = {};

export default React.memo(Forms);