import React, { useState } from 'react';
import './basket.scss';
import Menu from '../Menu/Menu';
import { useSelector, useDispatch } from 'react-redux';
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator';
import { actionFetchDeleteOneBasket } from '../../actions/basket';
import TextField from '@mui/material/TextField';
import BasketBtns from '../BasketBtns/BasketBtns';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { requestFetchBasketIngredientsList } from '../../requests/basketRequests';


const Basket = () => {
    const dispatch = useDispatch();

    const recipesCount = useSelector((state) => state?.basket?.list?.recipesCount[0]?.count || 0);
    const mealsCount = useSelector((state) => state?.basket?.list?.mealsCount[0]?.sum || 0);

    // State for switching between recipes tabulator and ingredients tabulator
    const [showIngredients, setShowIngredients] = useState(false);
    const [ingredients, setIngredients] = useState();

    // Function to update the state of the showIngredients
    const handleToggleIngredientsClick = async () => {
        // Get the list of ingredients
        const list = await requestFetchBasketIngredientsList();
        console.log(JSON.stringify(list.data));

        // Update the state to show the table of ingredients
        setShowIngredients((oldState) => !oldState);

        // UPdate the state containing the list of ingredients
        setIngredients(list.data);
    }

    // Get all recipes in the basket
    const recipes = useSelector((state) => state.basket.list);
    const data = recipes.recipes;

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

    // Building the columns array for recipes to serve to React Tabulator Component
    const columns = [
        { title: "Id", field: "id", hozAlign: "center", vertAlign: "middle", visible: false },
        { title: "Image", field: "img_name", formatter: imageFormatter, hozAlign: "center", vertAlign: "middle" },
        { title: "Recette", field: "title", vertAlign: "middle", width: 500, formatter: recipeTitleFormatter },
        { title: "Référence", field: "reference", vertAlign: "middle", width: 500 },
        { title: "Tps Cuisson", field: "cooking_time.minutes", hozAlign: "center", vertAlign: "middle", formatter: figuresFormatter },
        { title: "Tps Préparation", field: "preparation_time.minutes", hozAlign: "center", vertAlign: "middle", formatter: figuresFormatter },
        { title: "Nb repas", field: "meal_qty", hozAlign: "center", vertAlign: "middle", formatter: figuresFormatter },
        { title: 'Suppression', formatter: "buttonCross", hozAlign: "center", vertAlign: "middle", cellClick: deleteFromBasket },
    ];

    // Building the columns array for ingredients to serve to React Tabulator Component
    const ingredientsColumns = [
        { title: "Id", field: "id", hozAlign: "center", vertAlign: "middle", visible: false },
        { title: "Quantité", field: "sum", hozAlign: "center", vertAlign: "middle", width: 300 },
        { title: "Unité", field: "unit_name", hozAlign: "center", vertAlign: "middle", width: 300 },
        { title: "Ingrédient", field: "name", vertAlign: "middle", hozAlign: "center", width: 797 },

    ];

    return (
        <div>
            <Menu />
            <BasketBtns handleToggleIngredientsClick={handleToggleIngredientsClick} showIngredients={showIngredients} />
            <div className="basket-indicators">
                <div className="basket-indicators-box">
                    <label className="basket-label">Nombre de recettes</label>
                    <TextField value={recipesCount} />
                </div>
                <div className="basket-indicators-box">
                    <label className="basket-label">Nombre de repas</label>
                    <TextField value={mealsCount} />
                </div>
            </div>
            <div className="basket-table">
                {recipesCount > 0 && !showIngredients &&
                    <ReactTabulator
                        data={data}
                        columns={columns}
                        layout={"fitColumns"}
                    />
                }
                {recipesCount > 0 && showIngredients &&
                    <div className="basket-ingredients-table">
                        <ReactTabulator
                            data={ingredients}
                            columns={ingredientsColumns}
                        />
                    </div>
                }
            </div>
            {recipesCount == 0 &&
                <div className='basket-empty'>
                    <h1 className="basket-empty-title">LE PANIER EST VIDE</h1>
                    <ShoppingBasketIcon color="warning" sx={{ fontSize: "100px" }} />

                </div>}
        </div>
    )
}

export default React.memo(Basket);