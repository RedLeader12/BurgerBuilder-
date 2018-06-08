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


class BurgerBuilder extends Component {
    constructor(){
        super()
        this.state = {
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
        return sum > 0

    }

    purchaseHandler = () =>  {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinuedHanlder = () => {
        this.props.history.push('/checkout')
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
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        order={this.purchaseHandler}
            /> 
                </Aux> 
            )
            orderSummary =  <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.totalPrice}
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
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)); 