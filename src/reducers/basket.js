import { SET_BASKET_LIST } from '../actions/basket';

export const initialState = {
    list: [],
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_BASKET_LIST:
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;