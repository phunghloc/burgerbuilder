import React from 'react';

import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl.js';

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

const buildControls = (props) => {
    const controls = Object.keys(props.ingredients)
            .map(ingredient => {
                return {
                    label: capitalize(ingredient), 
                    type: ingredient,
                };
            });

    return (
        <div className="BuildControls">
            <p>Total price is: $ <b>{props.price}</b></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key = {ctrl.label} 
                    label = {ctrl.label} 
                    type = {ctrl.type}
                    added = {() => props.changeIngredients(ctrl.type, 1) }
                    remove = {() => props.changeIngredients(ctrl.type, -1) }
                    disabled = {props.disableInfo[ctrl.type]}
                    amount = {props.ingredients[ctrl.type]}
                    price = {props.eachPrice[ctrl.type]}
                />
            ))}
            <button 
                className = "OrderButton"
                disabled = {!props.purchasable}
                onClick = {props.purchasing}
                >Order Now</button>
        </div>
)};

export default buildControls;