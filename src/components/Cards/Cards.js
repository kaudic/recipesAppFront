import PropTypes from 'prop-types';
import React from 'react';
import CardCtn from '../../containers/CardCtn';
import './cards.scss';

const Cards = ({ recipes }) => {

  return (
    <section className="cards">
      {recipes && (
        <div className="cards-list">
          {recipes.map((recipe) => {
            return (
              <CardCtn
                key={recipe.id}
                {...recipe}
              />
            );
          })}
        </div>
      )}
    </section>
  )
};

Cards.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      reference: PropTypes.string.isRequired,
      img_name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      meal_qty: PropTypes.number.isRequired,
      cooking_time: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
      }).isRequired,
      preparation_time: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
      }).isRequired,
      type_id: PropTypes.number.isRequired,
      name: PropTypes.string
    }),
  )
};

Cards.defaultProps = {
  recipes: [],
};

export default React.memo(Cards);
