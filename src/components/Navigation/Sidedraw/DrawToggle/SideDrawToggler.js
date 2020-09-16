import React from 'react';

import './SideDrawToggler.css';

const sideDrawToggler = (props) => (
    <div 
        onClick = {props.click} 
        className="DrawerToggle">
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default sideDrawToggler;