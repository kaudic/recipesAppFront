import React from 'react';
import PropTypes from 'prop-types';
import './basket.scss';
import Menu from '../Menu/Menu';
import { useSelector } from 'react-redux';

const Basket = () => {

    // Get all recipes to find next or previous recipe
    const recipes = useSelector((state) => state.basket.list);
    console.log(recipes);

    return (
        <div>
            <Menu />
        </div>
    )
}

Basket.propTypes = {};

export default Basket;