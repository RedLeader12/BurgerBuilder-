import React, {Component} from 'react'

import Aux from '../../HOC/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3, 
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(){
        super()
        this.state = {
            ingredients: {salad: 0, bacon: 0, cheese: 0, meat: 0},
            totalPrice: 4,
            purchasable: 0,
            purcashing: false,
            loading: false 
        }
      
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        } , 0);
        this.setState({purchasable: sum > 0});

    }

    addIngredientHanlder = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1; 
        const updatedIngredients = {
            ...this.state.ingredients 
        };
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition 
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]

        if (oldCount <= 0 ){
            return;
        }

        const updatedCount = oldCount - 1; 
        const updatedIngredients = {
            ...this.state.ingredients 
        };
        updatedIngredients[type] = updatedCount
        const priceSubtract = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtract
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients); 
    }

    purchaseHandler = () =>  {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({loading: false})
    }

    purchaseContinuedHanlder = () => {
    this.setState({loading: true})
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, 
            customer: {
                name: 'Dania',
                address: {
                    street: 'Testing street',
                    zipCode: '12314',
                    country: 'Malaysia'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastet'
            }
        }
        axios.post('/orders.json', orders)
        .then(response => {
            this.setState({loading: false, purchasing: false})
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false})
            console.log(error)
        })
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients 
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }


        let orderSummary =  <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinuedHanlder}/>

        if(this.state.loading){
            orderSummary = <Spinner/> 
        }

        return(
            <Aux> 
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>  
            < Burger ingredients={this.state.ingredients}/> 
            <BuildControls 
                ingredientAdded={this.addIngredientHanlder}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                order={this.purchaseHandler}
            /> 
            </Aux> 
        );
    }
}

export default BurgerBuilder 