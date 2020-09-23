import React, {Component} from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummarry';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import './BurgerBuilder.css';
import * as actionTypes from '../../store/actions';

const INGREDIENTS_PRICES = {
    salad: 1,
    bacon: 2,
    meat: 3,
    cheese: 0.5,
}

class BurgerBuilder extends Component {
    state = {
        price: 2,
        purchasing: false,
        loading: false,
    }

    //TODO: nhận dữ liệu từ backend
    // componentDidMount() {
        // console.log('[BurgerBuilder.js] ComponentDidMount');
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: error.message});
        //     })
    // }

    //TODO: không có ingredient nào thì nút Purchase bị disable
    updatePurchasable(ingredients) {
        return Object.values(ingredients)
            .reduce((total, el) => total + el) > 0;
    }

    //TODO: hiện bảng xác nhận purchase
    purchasingHandler = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    //TODO: khi xác nhận purchase, gửi dữ liệu tới backend
    continueHandler = () => {
        // this.setState({loading: true, error: null});

        // const orders = {
        //     ingredients: this.props.ingredients,
        //     price: this.state.price,
        // };

        // axios.post('/orders.json', orders)
        //     .then(() => {
        //         this.setState({loading: false, purchasing: false});
        //         alert('Your order has been sent!');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({loading: false, purchasing: false});
        //     });
        
        // const queryParams = [];
        // for (const item in this.props.ingredients) {
        //     queryParams.push(`${encodeURIComponent(item)}=${encodeURIComponent(this.props.ingredients[item])}`);
        // }
        // queryParams.push(`price=${this.state.price}`);

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryParams.join('&'),
        // });
        this.props.history.push('/checkout');
    }

    render() {
        const disable = {
            ...this.props.ingredients,
        }

        for (const item in disable) {
            disable[item] = disable[item] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? 
            <div className="BurgerBuilder-error"> 
                <p>Ingredients can't be loaded</p> 
                <p>Error: {this.state.error}</p>
            </div>
            : <Spinner />;
            
        
        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />

                    <BuildControls 
                        ingredients={this.props.ingredients}
                        addIngredients = {this.props.onIngredientAdded}
                        removeIngredients = {this.props.onIngredientRemoved}
                        disableInfo = {disable}
                        price = {this.props.totalPrice}
                        purchasable = {this.updatePurchasable(this.props.ingredients)}
                        purchasing = {this.purchasingHandler}
                        eachPrice = {INGREDIENTS_PRICES}
                    /> 
                </>
            );
            orderSummary =  <OrderSummary 
                    ingredients = {this.props.ingredients} 
                    total = {this.props.totalPrice}
                    cancel = {this.purchasingHandler}
                    continue = {this.continueHandler}
                    />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <>
                <Modal 
                    show = {this.state.purchasing}
                    click = {this.purchasingHandler}
                >
                    {orderSummary}
                </Modal>

                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));