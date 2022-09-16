import React from 'react';
import PropTypes from 'prop-types';
import './basket.scss';
import Menu from '../Menu/Menu';
import { useSelector, useDispatch } from 'react-redux';
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator';
import { actionFetchDeleteOneBasket } from '../../actions/basket';
import TextField from '@mui/material/TextField';
import BasketBtns from '../BasketBtns/BasketBtns';

const Basket = () => {
    const dispatch = useDispatch();

    const recipesCount = useSelector((state) => state?.basket?.list?.recipesCount[0]?.count || 0);

    const mealsCount = useSelector((state) => state?.basket?.list?.mealsCount[0]?.sum || 0);


    // Get all recipes to find next or previous recipe
    const recipes = useSelector((state) => state.basket.list);
    // Function to format Recipe title
    const recipeTitleFormatter = (cell) => {
        return `<p class="basket-table-cell--recipe">${cell.getValue()}</p>`;
    }
    // Function to format Figures
    const figuresFormatter = (cell) => {
        return `<p class="basket-table-cell--figures">${cell.getValue()}</p>`;
    }
    // Function to format image
    const imageFormatter = (cell) => {
        return `<img class="basket-img" src=${process.env.REACT_APP_BASE_URL}/images/${cell.getValue()}>`;
    }
    // Function to delete a recipe from the basket
    const deleteFromBasket = (e, cell) => {
        const recipeId = cell.getData().id;
        dispatch(actionFetchDeleteOneBasket(recipeId));
    }
    const data = recipes.recipes;
    const columns = [
        { title: "Id", field: "id", hozAlign: "center", vertAlign: "middle", visible: false },
        { title: "Image", field: "img_name", formatter: imageFormatter, hozAlign: "center", vertAlign: "middle" },
        { title: "Recette", field: "title", vertAlign: "middle", formatter: recipeTitleFormatter },
        { title: "Référence", field: "reference", vertAlign: "middle" },
        { title: "Tps Cuisson", field: "cooking_time.minutes", hozAlign: "center", vertAlign: "middle", formatter: figuresFormatter },
        { title: "Tps Préparation", field: "preparation_time.minutes", hozAlign: "center", vertAlign: "middle", formatter: figuresFormatter },
        { title: "Nb repas", field: "meal_qty", hozAlign: "center", vertAlign: "middle", formatter: figuresFormatter },
        { formatter: "buttonCross", hozAlign: "center", vertAlign: "middle", cellClick: deleteFromBasket },
    ]

    return (
        <div>
            <Menu />
            <BasketBtns />
            <div className="basket-indicators">
                <div>
                    <label className="basket-label">Nombre de recettes</label>
                    <TextField value={recipesCount} />
                </div>
                <div>
                    <label className="basket-label">Nombre de repas</label>
                    <TextField value={mealsCount} />
                </div>
            </div>
            <div className="basket-table">
                <ReactTabulator
                    data={data}
                    columns={columns}
                    layout={"fitData"}
                    responsiveLayout={true}
                    fitColumns={true}
                />
            </div>
        </div>
    )
}

Basket.propTypes = {};

export default Basket;