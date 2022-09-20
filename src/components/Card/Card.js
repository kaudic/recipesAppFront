import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardIndicators from '../CardIndicators/CardIndicators';
import './card.scss';
import { useDispatch } from 'react-redux';
import { actionFetchAddOneBasket } from '../../actions/basket';

const Card = ({
  id,
  title,
  reference,
  type_name,
  img_name,
  meal_qty,
  cooking_time,
  preparation_time,
  basket
}) => {
  const dispatch = useDispatch();

  const handleAddToCartClick = () => {
    dispatch(actionFetchAddOneBasket(id));
  };

  return (
    <article className="card">
      <div className="card-img-container">
        <img className="card-img" src={`${process.env.REACT_APP_BASE_URL}/images/` + img_name} alt={img_name} />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-desc">Référence : {reference}</p>
        <span className={`card-type 
        ${type_name === 'VIANDE' ? 'card-type-viande' :
            type_name === 'POISSON' ? 'card-type-poisson' : 'card-type-vegan'}`}>{type_name}</span>
        <CardIndicators qtyMeal={meal_qty} preparationTime={preparation_time} cookingTime={cooking_time} />
        <div className="card-btn-ctn">
          <Link to={`/recipe/${id}`} className="card-link">Voir la recette</Link>
          <button disabled={basket} onClick={handleAddToCartClick} className={`card-btn ${basket ? 'card-btn-disabled' : ''}`} >Ajouter au Panier</button>
        </div>
      </div>
    </article>
  )
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  img_name: PropTypes.string.isRequired,
  meal_qty: PropTypes.number.isRequired,
  cooking_time: PropTypes.shape({
    minutes: PropTypes.number.isRequired,
  }).isRequired,
  preparation_time: PropTypes.shape({
    minutes: PropTypes.number.isRequired,
  }).isRequired
};

export default React.memo(Card);
