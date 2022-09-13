import React from 'react';
import PropTypes from 'prop-types';
import './recipeFormCreationBtns.scss';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';


const RecipeFormBtns = ({ handleCreationClick }) => {
    return (
        <div className="recipeFormBtns">
            <ButtonGroup size="large" aria-label="large button group" className="Recipe-btnGroup">
                {/* <Button variant="contained" onClick={handleCancelClick} endIcon={<CancelIcon />}>
                    Annuler
                </Button> */}
                <Button variant="contained" onClick={handleCreationClick} endIcon={<TaskAltIcon />}>
                    Créer
                </Button>
            </ButtonGroup>
        </div>
    )
}

RecipeFormBtns.propTypes = {};

export default React.memo(RecipeFormBtns);