import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                label: 'Your Name:',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name',
                },
                value: '',
            },
            email: {
                elementType: 'input',
                label: 'Your mail',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your mail',
                },
                value: '',
            },
            address: {
                elementType: 'input',
                label: 'Your address',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your address',
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                label: 'Delivery method',
                elementConfig: {
                    option: [
                        {value: 'cheapest', displayValue: 'Cheapest'}, 
                        {value: 'fastest', displayValue: 'Fastest'}
                    ],
                },
                value: 'cheapest',
            },
            option: {
                elementType: 'textarea',
                label: 'Your description',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your description',
                },
                value: '',
            },
        },
    }

    cancelHandler = () => {
        this.props.history.push('/');
    }

    orderedHandler = (event) => {
        event.preventDefault();

        const orderForm = {};
        for (const orderFormId in this.state.orderForm) {
            orderForm[orderFormId] = this.state.orderForm[orderFormId].value;
        }

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderForm: orderForm,
        };

        this.props.onOrderStart(orders);
    }

    changedInputHandler = (event, id) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElement = {...updatedOrderForm[id]};
        updatedElement.value = event.target.value;
        updatedOrderForm[id] = updatedElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        let ElementForm = [];

        for (const key in this.state.orderForm) {
            ElementForm.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        ElementForm = ElementForm.map(element => (
            <Input 
                key = {element.id}
                elementType = {element.config.elementType}
                elementConfig = {element.config.elementConfig}
                value = {element.config.value}
                label = {element.config.label}
                changed = {event => this.changedInputHandler(event, element.id)}
            />
        ))

        let form = (
            <>
                <h3>Please enter your info:</h3>
                <form onSubmit = {this.orderedHandler}>
                    {ElementForm}
                    <div className="ContactData-button">
                        <Button btnType = "Danger" clicked = {this.cancelHandler} >Cancel</Button>
                        <Button btnType = "Success" >Order</Button>
                    </div>
                </form>
            </>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className="ContactData">
                {form}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderStart: (orderData) => dispatch(orderActions.order(orderData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));