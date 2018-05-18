import React, {Component} from 'react'

import Aux from '../../HOC/Aux'
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    constructor(){
        super()
        this.state = {
            ingredients: {salad: 1, bacon: 1, cheese: 2, meat: 2}
        }
    }


    render(){
        return(
            <Aux> 
            <div> BuildControl </div> 
            < Burger ingredients={this.state.ingredients}/> 
            </Aux> 
        );
    }
}

export default BurgerBuilder 