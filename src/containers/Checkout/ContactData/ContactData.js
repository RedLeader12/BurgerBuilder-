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
            this.setState({loading: true})
        const formData = {};
        for (let formElementIdentifier in this.state.orderform ){
            formData[formElementIdentifier] = this.state.orderform[formElementIdentifier]
        }
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedOrderForm = {
            ...this.state.orderform
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value 
        updatedOrderForm[inputIdentifier] = updatedFormElement

        this.setState({orderform: updatedOrderForm})
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
            <form onSubmit={this.orderHandler}> 
                {formElementsArray.map(formElement => (
                    <Input 
                           key={formElement.id}
                           elementType={formElement.config.elementType}  
                           elementConfig={formElement.config.elementConfig} 
                           value={formElement.config.value} 
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}/> 
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