import React from 'react';

import './CheckoutSummary.css';
import Burger from '../Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it taste well!</h1>
            <div className="CheckoutSummary-div">
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button 
                btnType = "Danger"
                clicked = {props.cancel}
            >CANCEL
            </Button>
            <Button 
                btnType = "Success"
                clicked = {props.continue}
            >CONTINUE
            </Button>
        </div>
    );
}

export default checkoutSummary;