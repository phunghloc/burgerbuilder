import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDraw.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDraw = (props) => {
    let classes = ['SideDraw',props.show ? 'Open' : 'Close'].join(' ');

    return (
        <>
            <Backdrop 
                show = {props.show}
                click = {props.click} 
            />
            <div className= {classes}>
                <div className="SideDrawLogo">
                    <Logo />
                </div>

                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </>
    );
}

export default sideDraw;