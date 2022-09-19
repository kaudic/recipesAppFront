import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './unitForm.scss';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField } from '@mui/material';

const UnitForm = ({ unit, updateUnitChange, deleteUnit, unitFormClassName }) => {
    const [name, setName] = useState(unit.name);
    const [shortName, setShortName] = useState(unit.short_name);

    // function to handle the name of a unit in a state
    const handleOnChangeName = (event) => {
        setName(event.target.value);
    }

    // function to handle the update of a unit SHORT name after leaving the field
    const handleOnBlurShortName = (event) => {
        updateUnitChange(unit.id, name, shortName);
    }

    // function to handle the SHORT name of a unit in a state
    const handleOnChangeShortName = (event) => {
        setShortName(event.target.value);
    }

    // function to handle the update of a unit name after leaving the field
    const handleOnBlurName = (event) => {
        updateUnitChange(unit.id, name, shortName);
    }

    // function to delete an ingredient
    const handleClickDelete = (event) => {
        deleteUnit(unit.id);
    };



    return (
        <ListItem sx={{ width: '90%' }} className={unitFormClassName}>
            <TextField sx={{ width: '45%' }} onBlur={handleOnBlurName} onChange={handleOnChangeName} value={name} />
            <TextField sx={{ width: '45%' }} onBlur={handleOnBlurShortName} onChange={handleOnChangeShortName} value={shortName} />
            <ListItemIcon>
                <IconButton onClick={handleClickDelete}>
                    <DeleteIcon color="warning" />
                </IconButton>
            </ListItemIcon>
        </ListItem >
    )
}

UnitForm.propTypes = {};

export default React.memo(UnitForm);