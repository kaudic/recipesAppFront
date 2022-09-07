import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardIndicators from '../CardIndicators/CardIndicators';
import './style.scss';

const Card = ({
  id,
  title,
  reference,
  img_name,
  meal_qty,
  cooking_time,
  preparation_time,
  name
}) => (
  <article className="card">
    <div className="card-img-container">
      <img className="card-img" src={require(`../../assets/images/` + img_name)} alt={img_name} />
    </div>
    <div className="card-content">
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">Référence : {reference}</p>
      <CardIndicators qtyMeal={meal_qty} preparationTime={preparation_time.minutes} cookingTime={cooking_time.minutes} />
      <Link to={`/recipe/${id}`} className="card-link">Voir la recette</Link>
    </div>
  </article>
);

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
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
