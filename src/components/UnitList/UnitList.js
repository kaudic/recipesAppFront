import React from 'react';
import PropTypes from 'prop-types';
import './unitList.scss';
import IngredientForm from '../IngredientForm/IngredientForm';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UnitForm from '../UnitForm/UnitForm';

const UnitList = ({
    handleUnitDialBoxClickOpen,
    units,
    updateUnitChange,
    deleteUnit,
    unitListClassName,
    unitFormClassName
}) => {
    return (
        <>
            <h1 className="recipeForm-title">Liste des unités
                <Tooltip title="Ajouter Unité">
                    <IconButton onClick={handleUnitDialBoxClickOpen}>
                        <AddCircleIcon color="success" />
                    </IconButton>
                </Tooltip>
            </h1>
            <ul className={unitListClassName}>
                {units.map((unit) => <UnitForm
                    key={unit.id}
                    unit={unit}
                    units={units}
                    updateUnitChange={updateUnitChange}
                    deleteUnit={deleteUnit}
                    unitFormClassName={unitFormClassName} />
                )}
            </ul>
        </>

    )
}

UnitList.propTypes = {};

UnitList.defaultProps = {
    unitListClassName: '',
    unitFormClassName: '',
}

export default UnitList;