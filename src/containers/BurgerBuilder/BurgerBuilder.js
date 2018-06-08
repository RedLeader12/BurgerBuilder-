import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../HOC/Aux/Aux';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions'

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
            // ingredients: null,
            totalPrice: 4,
            purchasable: 0,
            purchasing: false,
            loading: false 
        }
      
    }

    componentDidMount(){
        console.log(this.props)
        // axios.get('https://react-my-burger-b66dd.firebaseio.com/ingredients .json')
        // .then(response => {
        //     const startingredients = response.data
        //     this.setState({ingredients: startingredients})
        // })
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
        const oldCount = this.props.ings[type]
        const updatedCount = oldCount + 1; 
        const updatedIngredients = {
            ...this.props.ings
        };
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition 
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ings[type]

        if (oldCount <= 0 ){
            return;
        }

        const updatedCount = oldCount - 1; 
        const updatedIngredients = {
            ...this.props.ings 
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
        const queryParams = [];
        for (let i in this.props.ings){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render(){

        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null
        let burger = null

        if(this.props.ings){
            burger = (
                <Aux>
                    < Burger ingredients={this.props.ings}/> 
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler}
            /> 
                </Aux> 
            )
            orderSummary =  <OrderSummary 
            ingredients={this.props.ings}
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

const MapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 