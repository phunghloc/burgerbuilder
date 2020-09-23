import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                value: '',
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
        loading: false,
    }

    cancelHandler = () => {
        this.props.history.push('/');
    }

    orderedHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const orderForm = {};
        for (const orderFormId in this.state.orderForm) {
            orderForm[orderFormId] = this.state.orderForm[orderFormId].value;
        }

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderForm: orderForm,
        };

        axios.post('/orders.json', orders)
            .then(() => {
                this.setState({loading: false});
                alert('Your order has been sent!');
                this.props.history.push('/burgerbuilder');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
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

        if (this.state.loading) {
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

export default connect(mapStateToProps)(ContactData);