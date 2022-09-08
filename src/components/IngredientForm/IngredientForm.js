import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const IngredientForm = ({ ingredient }) => {

    return (
        <ListItem sx={{ width: '90%' }} >
            <TextField sx={{ width: '15%' }} value={ingredient.qty} />
            <TextField sx={{ width: '30%' }} value={ingredient.unitName} />
            <TextField sx={{ width: '45%' }} value={ingredient.name} />
            <ListItemIcon>
                <IconButton>
                    <DeleteIcon color="warning" />
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