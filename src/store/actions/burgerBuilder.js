import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    };
};

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients,
        totalPrice: 2,
    }
}

export const fetchIngredientFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
        error: error,
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data));
            })
            .catch((error) => {
                dispatch(fetchIngredientFailed(error.message));
            })
    }
}