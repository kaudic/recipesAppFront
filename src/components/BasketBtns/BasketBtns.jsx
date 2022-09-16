import React from 'react';
import PropTypes from 'prop-types';
import './basketBtns.scss';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import IcecreamIcon from '@mui/icons-material/Icecream';
import { requestFetchBasketIngredientsList } from '../../requests/basketRequests';


const BasketBtns = ({ }) => {
    const getBasketIngredientsList = async () => {
        const list = await requestFetchBasketIngredientsList();
        console.log(list);
    }

    return (
        <div className="recipeFormBtns">
            <ButtonGroup size="large" aria-label="large button group" className="Recipe-btnGroup">
                <Button variant="contained" onClick={getBasketIngredientsList} endIcon={<FastfoodIcon />}>
                    Voir les ingrédients
                </Button>
                <Button variant="contained" endIcon={<IcecreamIcon />}>
                    Vider le panier
                </Button>
            </ButtonGroup>
        </div>
    )
}

BasketBtns.propTypes = {};

export default React.memo(BasketBtns);