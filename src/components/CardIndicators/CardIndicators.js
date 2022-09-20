import React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import './cardIndicators.scss';

const CardIndicators = (props) => {
    const { qtyMeal, preparationTime, cookingTime, className } = props;

    return (
        <div className={`cardIndicator ${className}`}>
            <IconButton aria-label="Nb Repas" color='info' fontSize='small'>
                <RestaurantIcon />
                {qtyMeal}
            </IconButton>
            <IconButton aria-label="Prépa" color='secondary'>
                <AccessTimeIcon />
                {preparationTime.hours ? preparationTime.hours + 'h' : ''}{preparationTime.minutes} mn
            </IconButton>
            <IconButton aria-label="Cuisson" color='success'>
                <MicrowaveIcon />
                {cookingTime.hours ? cookingTime.hours + 'h' : ''}{cookingTime.minutes} mn
            </IconButton>
        </div>
    )
}

CardIndicators.propTypes = {};

export default React.memo(CardIndicators);