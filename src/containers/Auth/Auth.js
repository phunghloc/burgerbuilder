import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

function Auth(props) {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            label: 'Email:',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your mail',
            },
            value: '',
        },
        password: {
            elementType: 'input',
            label: 'Password:',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter your password',
            },
            value: '',
        },
    });

    const [isSignIn, setIsSignIn] = useState(true);

    function switchSignInHandler(event) {
        event.preventDefault();
        setIsSignIn(prevMode => !prevMode);
    }

    function changeValueInput(event, id) {
        setControls({
            ...controls,
            [id]: {
                ...controls[id],
                value: event.target.value,
            }
        });
    }

    function submitHandler(event) {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignIn);
    }

    let ElementForm = [];
    for (const key in controls) {
        ElementForm.push({
            id: key,
            config: controls[key],
        })
    }
    ElementForm = ElementForm.map(element => (
        <Input 
            key = {element.id}
            elementType = {element.config.elementType}
            elementConfig = {element.config.elementConfig}
            value = {element.config.value}
            label = {element.config.label}
            changed = {event => changeValueInput(event,element.id)}
        />
    ))

    const errorMessage = props.error ? <p style = {{marginLeft: '24px', color: 'red', fontSize: '18px,'}}> Invalid email/password! </p>: null;

    let form = (
        <>
            <form onSubmit = {event => submitHandler(event)}>
                <h1>{isSignIn ? 'SIGN IN:' : 'SIGN UP:'}</h1>
                {errorMessage}
                {ElementForm}
                <div className="ContactData-button">
                    <Button btnType = "Danger" clicked = {() => props.history.push('/')} >Cancel</Button>
                    <Button btnType = "Success">{isSignIn ? 'Sign in' : 'Sign up'}</Button>
                </div>
                <div className="ContactData-button">
                    <Button btnType = "Danger" clicked = {event => switchSignInHandler(event)} >SWITCH TO {!isSignIn ? 'SIGN IN' : 'SIGN UP'}</Button>
                </div>
            </form>
        </>
    );

    return (
        <div className="ContactData">
            {!props.loading ? form : <Spinner />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signin) => dispatch(actions.auth(email, password, signin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);