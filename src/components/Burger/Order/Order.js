import React from 'react';

import './Order.css';

const order = (props) => {
    const ingredients = 
            Object.keys(props.ingredients)
            .map(ingredient => {
                return `${ingredient} (${props.ingredients[ingredient]})`
            }).join(', ');

    return (
        <div className="Order">
            <p>Ingredients: {ingredients} </p>
            <p>Price: <b> $ {props.price}</b></p>
        </div>
    );
}

export default order;