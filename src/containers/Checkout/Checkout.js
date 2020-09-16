import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1,
        }, 
        price: 0,
    }

    componentDidMount() {
        let price = 0;
        const ingredients = {};
        const query = new URLSearchParams(this.props.location.search);

        for (const [item, quality] of query.entries()) {
            if (item === 'price') {
                price = +quality;
            } else {
                ingredients[item] = +quality;
            }
        }

        this.setState({ingredients: ingredients, price: price});
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    render () {
        const contactData = (
            <ContactData 
                ingredients = {this.state.ingredients} 
                price = {this.state.price}
                {...this.props}
                />
        );

        return (
            <div >
                <Switch>
                    <Route path = {this.props.match.path + '/contact-info'} 
                        render = {() => contactData} 
                    />

                    <CheckoutSummary 
                        ingredients = {this.state.ingredients} 
                        cancel = {this.cancelHandler}
                        continue = {this.continueHandler}
                        />
                </Switch>
            </div>
        );
    }
}

export default Checkout;