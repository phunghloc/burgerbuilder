import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderData: orderData,
        orderId: id,
    };
};

const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAILED,
        error: error,
    };
};

const orderStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const order = (orderData) => {
    return dispatch => {
        dispatch(orderStart());

        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data)
                dispatch(orderSuccess(response.data.name, orderData));
                alert('Your order has been sent!');
            })
            .catch(error => {
                dispatch(orderFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}

const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        error: error,
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());

        axios.get('/orders.json')
            .then(response => {
                const orders = [];
                for (const item in response.data) {
                    orders.push({
                        ...response.data[item],
                        key: item,
                    });
                }
                dispatch(fetchOrderSuccess(orders));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOrderFail(error.message));
            })
    }
}