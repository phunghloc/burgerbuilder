import React from 'react';
import { Link } from 'react-router-dom';

import burgerLogo from '../../Assets/img/burger-logo.png';
import './Logo.css';

const logo = () => (
    <div className="Logo">
        <Link to='/burgerbuilder'>
            <img src={burgerLogo} alt="MyBurger"/>
        </Link>
    </div>
);

export default logo;