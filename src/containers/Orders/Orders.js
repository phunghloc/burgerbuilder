import React, { Component } from 'react';

import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const orders = [];
                for (const item in response.data) {
                    orders.push({
                        ...response.data[item],
                        key: item,
                    });
                }
                this.setState({orders: orders, loading: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    render() {
        let order = <Spinner />;
        if (this.state.orders.length) {
            order = this.state.orders.map(order => {
                return (
                    <Order 
                        key = {order.key} 
                        ingredients = {order.ingredients} 
                        price = {order.price}
                    />
                );
            }).reverse();
        }
        return (
            <div>
                {order}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);