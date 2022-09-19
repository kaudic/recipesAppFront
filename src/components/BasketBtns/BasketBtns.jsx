import React from 'react';
import PropTypes from 'prop-types';
import './basketBtns.scss';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import IcecreamIcon from '@mui/icons-material/Icecream';
import { useDispatch } from 'react-redux';
import { actionFetchDeleteAllBasket } from '../../actions/basket';


const BasketBtns = ({ handleToggleIngredientsClick, showIngredients }) => {
    const dispatch = useDispatch();

    const handleDeleteBasketClick = async () => {
        dispatch(actionFetchDeleteAllBasket());

    }

    return (
        <div className="recipeFormBtns">
            <ButtonGroup size="large" aria-label="large button group" className="Recipe-btnGroup">
                <Button color="secondary" variant="contained" onClick={handleToggleIngredientsClick} endIcon={<FastfoodIcon />}>
                    {showIngredients ? 'Voir la liste des recettes' : 'Voir les ingrédients'}
                </Button>
                <Button variant="contained" onClick={handleDeleteBasketClick} endIcon={<IcecreamIcon />}>
                    Vider le panier
                </Button>
            </ButtonGroup>
        </div>
    )
}

BasketBtns.propTypes = {};

export default React.memo(BasketBtns);