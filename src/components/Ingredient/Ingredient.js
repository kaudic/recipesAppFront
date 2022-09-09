import React from 'react';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './ingredient.scss';

const Ingredient = ({ ingredient }) => {

    return (
        <li className="ingredient">
            <PlayArrowIcon fontSize="large" /> {ingredient.qty} {ingredient.unitName} {ingredient.name}
        </li>
    )
}

Ingredient.propTypes = {
    modify: PropTypes.bool
};

Ingredient.defaultProps = {
    modify: false
};


export default React.memo(Ingredient);