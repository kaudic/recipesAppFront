import React, { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const IngredientForm = ({ ingredient, units, updateIngredientsQtyChange, updateIngredientsUnitChange, deleteIngredient }) => {

    const [qty, setQty] = useState(ingredient.qty);
    const [unit, setUnit] = useState(ingredient.unitId);

    // function to handle qty change
    const handleOnChangeQty = (event) => {
        setQty(event.target.value);
        updateIngredientsQtyChange(ingredient.id, event.target.value);
    }

    // function to handle a unit change
    const handleSelectUnitChange = (event) => {
        setUnit(event.target.value);
        updateIngredientsUnitChange(ingredient.id, event.target.value);
    };


    // function to delete an ingredient
    const handleClickDelete = (event) => {
        deleteIngredient(ingredient.id);
    };

    return (
        <ListItem sx={{ width: '90%' }} >
            <TextField sx={{ width: '15%' }} value={qty} onChange={handleOnChangeQty} />

            <Select
                sx={{ width: '30%' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={unit}
                onChange={handleSelectUnitChange}
            >{units.map((unit) => <MenuItem value={parseInt(unit.id)}>{unit.name}</MenuItem>)}
            </Select>

            <TextField sx={{ width: '45%' }} value={ingredient.name} disabled />
            <ListItemIcon>
                <IconButton>
                    <DeleteIcon color="warning" onClick={handleClickDelete} />
                </IconButton>
            </ListItemIcon>
        </ListItem >
    )
}

IngredientForm.propTypes = {

};

IngredientForm.defaultProps = {

};


export default React.memo(IngredientForm);