import React, {Component} from 'react';

import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDraw from '../Navigation/Sidedraw/SideDraw';

class Layout extends Component {
    state = {
        showSideDraw: false,
    }

    toggleSideDrawHandler = () => {
        this.setState(prevState => {
            return { 
                showSideDraw: !prevState.showSideDraw,
            };
        });
    }

    render () {
        return (
            <>
                <Toolbar click = {this.toggleSideDrawHandler} />
                <SideDraw 
                    click = {this.toggleSideDrawHandler} 
                    show = {this.state.showSideDraw}
                />
                <main className='content'>
                    {this.props.children}
                </main>
            </>
        )
    }
};

export default Layout;