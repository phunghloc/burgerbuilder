import * as actionTypes from './actionTypes';
import axios from 'axios'

const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const auth = (email, password, signin) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0xU5IY388ZsqD3FO_qP43EvEZgTHQOH8';
        if (signin) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0xU5IY388ZsqD3FO_qP43EvEZgTHQOH8';

        axios.post(url, authData)
            .then(response => {
                // console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(error => {
                // console.log(error);
                // console.log(error.message);
                dispatch(authFail(error));
            })
    }
}