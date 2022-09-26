import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from '@mui/material';
import './carouselArrow.scss';
import { useParams, useNavigate } from 'react-router-dom';
import getNextId from '../../Tools/getNextId';

const CarouselArrow = ({ direction, recipes }) => {
    let navigate = useNavigate();

    // Get recipe id from url params
    const { id: recipeId } = useParams();

    // Get next id and previous Id using tools function
    const { nextId, previousId } = getNextId(recipes, recipeId);

    // function to handle the click on an arrow, left or right
    const handleArrowClick = (event) => {
        switch (direction) {
            case 'left':
                return navigate(`/recipe/${previousId}`);
            case 'right':
                return navigate(`/recipe/${nextId}`);
            default: return
        }
    }

    return (
        <div className="carousel">
            <Tooltip title={direction === 'left' ? "Recette précédente" : "Recette suivante"}>
                <span>
                    <IconButton onClick={handleArrowClick} >
                        {direction === 'left' ?
                            <ArrowLeftIcon sx={{ fontSize: '100px', height: '100%' }} />
                            :
                            <ArrowRightIcon sx={{ fontSize: '100px', height: '100%' }} />
                        }
                    </IconButton>
                </span>
            </Tooltip>
        </div >
    )
};

CarouselArrow.propTypes = {
    direction: PropTypes.string.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        reference: PropTypes.string.isRequired,
        img_name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        meal_qty: PropTypes.number.isRequired,
        cooking_time: PropTypes.shape({
            hours: PropTypes.number,
            minutes: PropTypes.number
        }).isRequired,
        preparation_time: PropTypes.shape({
            hours: PropTypes.number,
            minutes: PropTypes.number
        }).isRequired,
        type_id: PropTypes.number.isRequired,
        basket: PropTypes.bool.isRequired
    })).isRequired,
};

export default React.memo(CarouselArrow);