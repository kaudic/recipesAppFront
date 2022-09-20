import { SET_TYPES_LIST } from '../actions/types';

export const initialState = {
    list: [],
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_TYPES_LIST:
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;