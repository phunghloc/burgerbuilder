import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case('input'):
            inputElement = <input
                className="Input-element"
                {...props.elementConfig}
                onChange = {props.changed}
                value = {props.value}
                type = {props.elementConfig.type}
                required
                />;
            break;
        case('textarea'):
            inputElement = <textarea
                className="Input-element"
                onChange = {props.changed}
                value = {props.value}
                {...props.elementConfig}
                />;
            break;
        case('select'):
            inputElement = <select
                className="Input-element"
                value = {props.value}
                onChange = {props.changed}
                >
                    {props.elementConfig.option.map(element => (
                        <option key = {element.value} value = {element.value}> {element.displayValue} </option>
                    ))}
                </select>;
            break;
        default:
            inputElement = <input
                className="Input-element"
                onChange = {props.changed}
                value = {props.value}
                {...props.elementConfig}
                />;
    }

    return (
        <div className="Input-input">
            <label className="Input-label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;