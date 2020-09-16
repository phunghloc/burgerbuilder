import React from 'react';

import './OrderSummary.css';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    return (
        < >
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {Object.keys(props.ingredients).map(item => {
                    return (
                        <li className="OrderSummary" key={item}>
                            <span style={{textTransform: 'capitalize'}}>{item}</span>: {props.ingredients[item]}
                        </li>
                    );
                })}
            </ul>
            <p>Total price: $ {props.total}</p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
        </ >
    );
};


export default orderSummary;