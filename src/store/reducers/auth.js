import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case actionTypes.AUTH_SUCCESS:
            return {
                loading: false,
                token: action.token,
                userId: action.userId,
                error: null,
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        default: 
            return state;
    }
}

export default reducer;