import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Cards from '../components/Cards';

const CardsCtn = () => {
    // Get the searchList from the store and give it as props to Cards component
    const recipes = useSelector((state) => state.recipes.searchList);

    return (
        <Cards recipes={recipes} />
    )
}

CardsCtn.propTypes = {};

export default React.memo(CardsCtn);