import React, { Component } from 'react';

import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        ingredients: null,
        loading: false,
    }

    cancelHandler = () => {
        this.props.history.push('/');
    }

    orderedHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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

    render() {
        let form = (
            <>
                <h3>Please enter your info:</h3>
                <form action="">
                    <label className="ContactData-Input" htmlFor="name">Name:</label>
                    <input className="ContactData-Input" type="text" name="name" placeholder="Enter your name" />

                    <label className="ContactData-Input" htmlFor="name">Email:</label>
                    <input className="ContactData-Input" type="email" name="email" placeholder="Enter your email" />

                    <label className="ContactData-Input" htmlFor="street">Address:</label>
                    <input className="ContactData-Input" type="text" name="address" placeholder="Enter your address" />

                    <Button btnType = "Danger" clicked = {this.cancelHandler} >Cancel</Button>
                    <Button btnType = "Success" clicked = {this.orderedHandler} >Order</Button>
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

export default ContactData;