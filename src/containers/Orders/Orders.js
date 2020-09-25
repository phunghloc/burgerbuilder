import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder();
    }

    render() {
        let order = <Spinner />;
        if (this.props.orders.length) {
            order = this.props.orders.map(order => {
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrder()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));