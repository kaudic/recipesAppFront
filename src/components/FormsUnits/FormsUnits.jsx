import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import './formsUnits.scss';
import { TextField } from '@mui/material';
import UnitList from '../UnitList/UnitList';
import UnitDialogBox from '../UnitDialogBox/UnitDialogBox';
import { actionFetchDeleteUnit, actionFetchPutUnit, actionFetchCreateUnit } from '../../actions/units';
import filterArray from '../../Tools/filterArray';


const FormsUnits = ({
    units,
}) => {
    const dispatch = useDispatch();

    // States for units dialog box
    const [unitDialBoxOpen, setUnitDialBoxOpen] = useState(false);
    const [unitNameInputValue, setUnitNameInputValue] = useState('');
    const [unitShortNameInputValue, setUnitShortNameInputValue] = useState('');
    const [searchUnitsString, setSearchUnitsString] = useState('');
    const [searchUnits, setSearchUnits] = useState();

    // function to change short name of unit
    const handleChangeUnitShortName = (event) => {
        setUnitShortNameInputValue(event.target.value);
    }

    // function to change name of unit
    const handleChangeUnitName = (event) => {
        setUnitNameInputValue(event.target.value);
    }

    // function for unit management Tab - update unit name and short name 
    const updateUnitChange = (id, unitNameInputValue, unitShortNameInputValue) => {
        const updatedUnit = { id, "unit": { name: unitNameInputValue, shortName: unitShortNameInputValue } };
        dispatch(actionFetchPutUnit(updatedUnit));
    }
    // function to display a dialogBox to add Unit to the Unit List
    const handleUnitDialBoxClickOpen = () => {
        setUnitDialBoxOpen(true);
    };
    // function to initialize the states of the units dialogbox after it closes
    const cancelUnitDialogBoxState = () => {
        setUnitNameInputValue('');
        setUnitShortNameInputValue('');
    };
    // function to hide a dialogBox to add Units to the Recipe
    const handleUnitDialBoxClickClose = () => {
        setUnitDialBoxOpen(false);
        // cancel all the states so that next time dialogbox shows up, it is empty
        cancelUnitDialogBoxState();
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
    // function to filter the units on screen
    const handleUnitsSearchOnChange = (event) => {
        setSearchUnitsString(event.target.value);
    }
    // function for unit management Tab - delete unit from list
    const deleteUnit = (unitId) => {
        dispatch(actionFetchDeleteUnit(unitId));
    }

    useEffect(() => {
        if (searchUnitsString !== '') {
            const searchUnits = filterArray(units, searchUnitsString);
            setSearchUnits(searchUnits)
        } else {
            setSearchUnits(units)
        }
    }, [searchUnitsString, units])

    return (
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
        </div>
    )
}

FormsUnits.propTypes = {};

export default FormsUnits;