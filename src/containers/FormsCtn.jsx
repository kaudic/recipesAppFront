import React from 'react';
import Forms from '../components/Forms/Forms';
import { useSelector } from 'react-redux';

const FormsCtn = () => {
    // Get datas from the redux store
    const units = useSelector((state) => state.units.list);
    const types = useSelector((state) => (state.types.list));
    const ingredients = useSelector((state) => state.ingredients.list);

    return (
        <Forms
            units={units}
            types={types}
            ingredients={ingredients}
        />
    )
}

export default React.memo(FormsCtn);