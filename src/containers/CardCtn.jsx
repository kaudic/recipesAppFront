import React from 'react';
import Card from '../components/Card/Card';
import { useDispatch } from 'react-redux';
import { actionFetchAddOneBasket } from '../actions/basket';
import PropTypes from 'prop-types';

const CardCtn = ({
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
        <Card
            id={id}
            title={title}
            reference={reference}
            type_name={type_name}
            img_name={img_name}
            meal_qty={meal_qty}
            cooking_time={cooking_time}
            preparation_time={preparation_time}
            basket={basket}
            handleAddToCartClick={handleAddToCartClick}
        />
    )
}

CardCtn.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    img_name: PropTypes.string.isRequired,
    meal_qty: PropTypes.number.isRequired,
    cooking_time: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number,
    }).isRequired,
    preparation_time: PropTypes.shape({
        hours: PropTypes.number,
        minutes: PropTypes.number,
    }).isRequired,
    type_name: PropTypes.string.isRequired
};

export default React.memo(CardCtn);