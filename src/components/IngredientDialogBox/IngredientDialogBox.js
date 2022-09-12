import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import './ingredientDialogBox.scss';
import buildAutocompleteOptions from '../../Tools/buildAutocompleteOptions';

import PropTypes from 'prop-types';

const IngredientDialogBox = ({
    ingregientDialBoxOpen,
    handleIngredientDialBoxClickClose,
    handleIngredientDialBoxClickValidate,
    units,
    ingredientsList,
    handleChangeOfQty,
    handleChangeOfIngredient,
    handleChangeOfUnit,
    ingredientInputValue,
    unitValue }) => {

    // Creating arrays for MUI autocomplete
    const unitsOptions = buildAutocompleteOptions(units);
    const ingredientsOptions = buildAutocompleteOptions(ingredientsList, { unitId: 'main_unit_id' });

    return (

        <Dialog open={ingregientDialBoxOpen} onClose={handleIngredientDialBoxClickClose}>
            <DialogTitle>Ajouter un ingrédient à la recette</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choisir un ingrédient dans la liste puis indiquer la quantité
                </DialogContentText>
                <Autocomplete
                    id="ingredientsAutocomplete"
                    options={ingredientsOptions}
                    inputValue={ingredientInputValue}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    fullWidth
                    autoComplete
                    renderInput={(params) => (
                        <TextField {...params} label="Taper un ingrédient" variant="standard" />
                    )}
                    onChange={handleChangeOfIngredient}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Rentrer une Quantité"
                    type="value"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeOfQty}
                />
                <Autocomplete
                    id="unitsAutocomplete"
                    options={unitsOptions}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    autoComplete
                    renderInput={(params) => (
                        <TextField {...params} label="Choisir une Unité" variant="standard" />
                    )}
                    value={unitValue}
                    onChange={handleChangeOfUnit}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleIngredientDialBoxClickClose}>Annuler</Button>
                <Button onClick={handleIngredientDialBoxClickValidate}>Ajouter</Button>
            </DialogActions>
        </Dialog>

    )
}

IngredientDialogBox.propTypes = {
    modify: PropTypes.bool
}

IngredientDialogBox.defaultProps = {
    modify: false
}

export default React.memo(IngredientDialogBox);