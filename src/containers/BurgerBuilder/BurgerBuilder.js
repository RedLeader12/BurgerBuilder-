import React, {Component} from 'react'
import Aux from '../../HOC/Aux'

class BurgerBuilder extends Component {
    render(){
        return(
            <Aux> 
            <div> BuildControl </div> 
            <div> Burger </div> 
            </Aux> 
        );
    }
}

export default BurgerBuilder 