import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js';

const burger = ( props ) => {
    let transformedIngredients = 
        Object.keys(props.ingredients).map( key => {
                return [...Array(props.ingredients[key])].map((_, index) => {
                        return <BurgerIngredient type={key} key={key + index} />
                        });
                }).flat(Infinity);
    
    if (!transformedIngredients.length) {
        transformedIngredients = <p className="Nothing">Please add your ingredients :)</p>
    }

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;