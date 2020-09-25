import * as actionType from '../actions/actionTypes';

const initState = {
    orders: [],
    loading: false,
    purchased: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return {
                ...state,
                purchased: false,
            }

        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }

        case actionType.ORDER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                order: state.orders.concat(newOrder),
                purchased: true,
            };

        case actionType.ORDER_FAILED:
            return {
                ...state,
                loading: false,
            };

        case actionType.FETCH_ORDERS_START: {
            return {
                ...state,
                loading: true,
            }
        }

        case actionType.FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                orders: action.orders,
            }
        }

        case actionType.FETCH_ORDERS_FAIL: {
            return {
                ...state,
                loading: false,
            }
        }

        default:
            return state;
    }
}

export default reducer;