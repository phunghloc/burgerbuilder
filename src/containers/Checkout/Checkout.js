import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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

        let summary = (<Redirect to = '/' />);
        let purchased = this.props.purchased ? <Redirect to='/burger-builder' /> : null;

        if (this.props.ingredients) {
            summary = (
                <>
                    <Switch>
                        {purchased}
                        <Route path = {this.props.match.path + '/contact-info'} 
                            render = {() => contactData} 
                        />

                        <CheckoutSummary 
                            ingredients = {this.props.ingredients} 
                            cancel = {this.cancelHandler}
                            continue = {this.continueHandler}
                        />
                    </Switch>
                </>
            )
        }
        return (
            <div >
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);