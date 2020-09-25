import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: null,
};

const INGREDIENTS_PRICES = {
    salad: 1,
    bacon: 2,
    meat: 3,
    cheese: 0.5,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
            };

        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
            };
        
        case actionType.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: action.totalPrice,
                error: null,
            };

        case actionType.FETCH_INGREDIENT_FAILED: 
            return {
                ...state,
                error: action.error,
            }
            

        default:
            return state;
    }
}

export default reducer;

