import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderform: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'YourName'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'YourEmail'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'ZipCode'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Country'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', display: 'fastest'},
                            {value: 'cheapest', display: 'cheapest'}
                    ],
            },
        loading: false 
        }
    }
}


    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        console.log(this.props.price)
            this.setState({loading: true})
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }
        axios.post( '/orders.json', orders )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }



  render() {

        const formElementsArray = []
        for (let key in this.state.orderform){
            formElementsArray.push({
                id: key, 
                config: this.state.orderform[key]
            })
        }

        let form = (
            <form> 
                {formElementsArray.map(formElement => (
                    <Input 
                           key={formElement.id}
                           elementType={formElement.config.elementType}  
                           elementConfig={formElement.config.elementConfig} 
                           value={formElement.config.value} /> 
                ))}
                <Button btnType="Success" clicked={this.orderHandler}> Order </Button> 
            </form> 
        );
        if(this.state.loading){
            form = < Spinner /> 
        }
    return(
        <div className={classes.ContactData}>
            <h4> Enter Contact Data: </h4> 
            {form }
        </div> 
    )
  }
}

export default ContactData;