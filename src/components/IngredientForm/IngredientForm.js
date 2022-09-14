import React, { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const IngredientForm = ({ ingredient, units, updateIngredientsQtyChange, updateIngredientsUnitChange, deleteIngredient, showQty, enableIngredientName, ingredientFormClassName }) => {

    const [qty, setQty] = useState(ingredient.qty);
    const [unit, setUnit] = useState(ingredient.main_unit_id || ingredient.unitId);
    const [name, setName] = useState(ingredient.name);

    // function to handle qty change
    const handleOnChangeQty = (event) => {
        setQty(event.target.value);
        updateIngredientsQtyChange(ingredient.id, event.target.value);
    }

    // function to handle the change if an ingredient's name
    const handleOnChangeName = (event) => {
        setName(event.target.value);
    }

    // function to handle the update an ingredient name after leaving the field
    const handleOnBlurName = (event) => {
        updateIngredientsUnitChange(ingredient.id, ingredient.main_unit_id, name);

    }

    // function to handle a unit change
    const handleSelectUnitChange = (event) => {
        setUnit(event.target.value);
        updateIngredientsUnitChange(ingredient.id, event.target.value, name);
    };

    // function to delete an ingredient
    const handleClickDelete = (event) => {
        deleteIngredient(ingredient.id);
    };

    return (
        <ListItem sx={{ width: '90%' }} className={ingredientFormClassName}>
            {showQty && <TextField sx={{ width: '15%' }} value={qty} onChange={handleOnChangeQty} />}

            <Select
                sx={{ width: '30%' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={unit}
                onChange={handleSelectUnitChange}
            >{units.map((unit) => <MenuItem key={unit.id} value={parseInt(unit.id)}>{unit.name}</MenuItem>)}
            </Select>

            <TextField sx={{ width: '45%' }} onBlur={handleOnBlurName} onChange={handleOnChangeName} value={name} disabled={enableIngredientName ? false : true} />
            <ListItemIcon>
                <IconButton onClick={handleClickDelete}>
                    <DeleteIcon color="warning" />
                </IconButton>
            </ListItemIcon>
        </ListItem >
    )
}

IngredientForm.propTypes = {

};

IngredientForm.defaultProps = {
    ingredientListClassName: ''
};


export default React.memo(IngredientForm);