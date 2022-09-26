import React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import './cardIndicators.scss';

const CardIndicators = ({
    qtyMeal,
    preparationTime,
    cookingTime,
    className
}) => {


    return (
        <div className={`cardIndicator ${className}`}>
            <IconButton aria-label="Nb Repas" color='info' fontSize='small'>
                <RestaurantIcon />
                {qtyMeal}
            </IconButton>
            <IconButton aria-label="Prépa" color='secondary'>
                <AccessTimeIcon />
                {preparationTime.hours ? preparationTime.hours + 'h' : ''}
                {preparationTime.minutes ? preparationTime.minutes + 'mn' : '00'}
            </IconButton>
            <IconButton aria-label="Cuisson" color='success'>
                <MicrowaveIcon />
                {cookingTime.hours ? cookingTime.hours + 'h' : ''}
                {cookingTime.minutes ? cookingTime.minutes + 'mn' : '00'}
            </IconButton>
        </div>
    )
}

CardIndicators.propTypes = {
    qtyMeal: PropTypes.number.isRequired,
    preparationTime: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number
    }).isRequired,
    cookingTime: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number
    }).isRequired,
    className: PropTypes.string
};

export default React.memo(CardIndicators);