import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummarry';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import './BurgerBuilder.css';

const INGREDIENTS_PRICES = {
    salad: 1,
    bacon: 2,
    meat: 3,
    cheese: 0.5,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price: 2,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    //TODO: nhận dữ liệu từ backend
    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: error.message});
            })
    }

    //TODO: không có ingredient nào thì nút Purchase bị disable
    updatePurchasable(ingredients) {
        return Object.values(ingredients)
            .reduce((total, el) => total + el) > 0;
    }

    //TODO: xử lý khi thêm/ bớt ingredient
    changeIngredientsHandler = (type, quality) => {
        const ingredients = {
            ...this.state.ingredients,
        };

        ingredients[type] = ingredients[type] + quality;

        this.setState({
            ingredients: ingredients,
            price: this.state.price + INGREDIENTS_PRICES[type],
        });
        this.setState({purchasable: this.updatePurchasable(ingredients)});
    }

    //TODO: hiện bảng xác nhận purchase
    purchasingHandler = () => {
        this.setState({purchasing: !this.state.purchasing});
    }

    //TODO: khi xác nhận purchase, gửi dữ liệu tới backend
    continueHandler = () => {
        // this.setState({loading: true, error: null});

        // const orders = {
        //     ingredients: this.state.ingredients,
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
        
        const queryParams = [];
        for (const item in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(item)}=${encodeURIComponent(this.state.ingredients[item])}`);
        }
        queryParams.push(`price=${this.state.price}`);

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&'),
        });
    }

    render() {
        const disable = {
            ...this.state.ingredients,
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
            
        
        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls 
                        ingredients={this.state.ingredients}
                        changeIngredients = {this.changeIngredientsHandler}
                        disableInfo = {disable}
                        price = {this.state.price}
                        purchasable = {this.state.purchasable}
                        purchasing = {this.purchasingHandler}
                        eachPrice = {INGREDIENTS_PRICES}
                    /> 
                </>
            );
            orderSummary =  <OrderSummary 
                    ingredients = {this.state.ingredients} 
                    total = {this.state.price}
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

export default withErrorHandler(BurgerBuilder, axios);