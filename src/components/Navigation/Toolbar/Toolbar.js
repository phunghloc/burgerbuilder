import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawToggler from '../Sidedraw/DrawToggle/SideDrawToggler';

const toolbar = (props) => (
    <header className="Toolbar">
        <SideDrawToggler click = {props.click} />

        <div className="DivLogo">
            <Logo/>
        </div>

        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;