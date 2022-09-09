import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Menu from '../Menu/Menu';
import './recipe.scss';
import CardIndicators from '../CardIndicators/CardIndicators';
import Ingredient from '../Ingredient/Ingredient';
import RecipeBtns from '../RecipeBtns/RecipeBtns';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe, handleDeleteClick, handleModifyClick }) => {

    return (
        <Page>
            <Menu />
            <RecipeBtns handleDeleteClick={handleDeleteClick} handleModifyClick={handleModifyClick} />
            <div className="recipe">
                <div className="recipe-div">
                    <h1 className="recipe-title">{recipe.title}</h1>
                    <h2 className="recipe-reference">
                        {recipe.reference.includes('http') ?
                            <Link to={recipe.reference}> {recipe.reference} </Link> :
                            <p>{recipe.reference}</p>
                        }
                    </h2>
                    {/* <img src={require(`../../assets/images/${recipe.img_name}`)} alt={"recipe.img_name"}></img> */}
                    <img src={`${process.env.REACT_APP_BASE_URL}/images/${recipe.img_name}`} alt={"recipe.img_name"}></img>

                    <CardIndicators className="recipe-indicators" qtyMeal={recipe.meal_qty} preparationTime={recipe.preparation_time.minutes} cookingTime={recipe.cooking_time.minutes} />
                </div>
                <div className="recipe-div">
                    <h1 className="recipe-title">Recette</h1>
                    {recipe.text}
                </div>
                <div className="recipe-div">
                    <h1 className="recipe-title">Liste des ingrédients</h1>
                    <ul className="ingredients">
                        {recipe.ingredients.map((ingredient) => <Ingredient key={ingredient.id} ingredient={ingredient} />)}
                    </ul>
                </div>
            </div>
        </Page>
    )
}

Recipe.propTypes = {}

export default React.memo(Recipe);