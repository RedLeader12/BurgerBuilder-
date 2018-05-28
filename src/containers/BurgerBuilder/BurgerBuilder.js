import React, {Component} from 'react'

import Aux from '../../HOC/Aux/Aux';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
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
            ingredients: null,
            totalPrice: 4,
            purchasable: 0,
            purchasing: false,
            loading: false 
        }
      
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('https://react-my-burger-b66dd.firebaseio.com/ingredients .json')
        .then(response => {
            const startingredients = response.data
            this.setState({ingredients: startingredients})
        })
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
        console.log(this.state.ingredients)
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
        this.setState({purchasing: false})
    }

    purchaseContinuedHanlder = () => {
    // this.setState({loading: true})
    //     const orders = {
    //         ingredients: this.state.ingredients,
    //         price: this.state.totalPrice, 
    //         customer: {
    //             name: 'Dania',
    //             address: {
    //                 street: 'Testing street',
    //                 zipCode: '12314',
    //                 country: 'Malaysia'
    //             },
    //             email: 'test@test.com',
    //             deliveryMethod: 'fastet'
    //         }
    //     }
    //     axios.post('/orders.json', orders)
    //     .then(response => {
    //         this.setState({loading: false, purchasing: false})
    //     })
    //     .catch(error => {
    //         this.setState({loading: false, purchasing: false})
    //         console.log(error)
    //     })
        this.props.history.push('/checkout')
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients 
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null
        let burger = null

        if(this.state.ingredients){
            burger = (
                <Aux>
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
            )
            orderSummary =  <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinuedHanlder}/>
        }
      
        if(this.state.loading){
            orderSummary = <Spinner/> 
        }

        return(
            <Aux> 
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>  
                {burger}
            </Aux> 
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios); 