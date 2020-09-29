import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link='/burgerbuilder'>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Checkout</NavigationItem>
        <NavigationItem link='/auth'>Authenticate</NavigationItem>
    </ul>
);

export default navigationItems;