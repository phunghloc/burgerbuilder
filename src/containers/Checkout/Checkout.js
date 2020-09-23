import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // componentDidMount() {
    //     let price = 0;
    //     const ingredients = {};
    //     const query = new URLSearchParams(this.props.location.search);

    //     for (const [item, quality] of query.entries()) {
    //         if (item === 'price') {
    //             price = +quality;
    //         } else {
    //             ingredients[item] = +quality;
    //         }
    //     }

    //     this.setState({ingredients: ingredients, price: price});
    // }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.push('/checkout/contact-info');
    }

    render () {
        const contactData = (
            <ContactData 
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
                        ingredients = {this.props.ingredients} 
                        cancel = {this.cancelHandler}
                        continue = {this.continueHandler}
                        />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

export default connect(mapStateToProps)(Checkout);