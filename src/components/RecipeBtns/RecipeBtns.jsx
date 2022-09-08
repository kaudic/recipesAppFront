import React from 'react';
import PropTypes from 'prop-types';
import './recipeBtns.scss';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';

const RecipeBtns = ({ handleDeleteClick, handleModifyClick }) => {
    return (
        <div className="recipeBtns">
            <ButtonGroup size="large" aria-label="large button group" className="Recipe-btnGroup">
                <Button variant="contained" onClick={handleDeleteClick} startIcon={<DeleteIcon />}>
                    Supprimer
                </Button>
                <Button variant="contained" onClick={handleModifyClick} endIcon={<EditIcon />}>
                    Modifier
                </Button>
                <Button variant="contained" endIcon={<ShoppingCartIcon />}>
                    Ajouter
                </Button>
            </ButtonGroup>
        </div>
    )
}

RecipeBtns.propTypes = {};

export default React.memo(RecipeBtns);