import React from 'react';
import PropTypes from 'prop-types';
import CarouselArrow from '../components/CarouselArrow/CarouselArrow';
import { useSelector } from 'react-redux';

const CarouselArrowCtn = ({
    direction
}) => {
    // Get all recipes to find next or previous recipe
    const recipes = useSelector((state) => state.recipes.searchList);

    return (
        <CarouselArrow direction={direction} recipes={recipes} />
    )
}

CarouselArrowCtn.propTypes = {
    direction: PropTypes.string.isRequired
};

export default React.memo(CarouselArrowCtn);