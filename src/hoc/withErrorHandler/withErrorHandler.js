import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.confirmErrorHandler();
                return request;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        confirmErrorHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <>  
                    <Modal 
                        show = {this.state.error}
                        click = {this.confirmErrorHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>

                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}

export default withErrorHandler;