import React, {Component} from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {
    render () {
        return (
            <>
                <Backdrop show = {this.props.show} click = {this.props.click} />
                <div className = "Modal"
                    style = {{transform: `translateY(${this.props.show ? 0 : -100}vh)`,
                            opacity: this.props.show ? 1 : 0,}}>
    
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default modal;