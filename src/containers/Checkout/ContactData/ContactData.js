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
                    value: '',
                    validation: {
                        required: true,  
                    },
                    valid: false,
                    touched: false,
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'YourEmail'
                    },
                    value: '',
                    validation: {
                        required: true, 
                    },
                    valid: false ,
                    touched: false, 
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Street'
                    },
                    value: '',
                    validation: {
                        required: true, 
                    },
                    valid: false ,
                    touched: false, 
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'ZipCode'
                    },
                    value: '',
                    validation: {
                        required: true, 
                        minLength: 1, 
                        maxLength: 5,

                    },
                    valid: false ,
                    touched: false, 
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder:'Country'
                    },
                    value: '',
                    validation: {
                        required: true, 
                    },
                    valid: false,
                    touched: false, 
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', display: 'fastest'},
                            {value: 'cheapest', display: 'cheapest'}
                    ],
            },
            value: ''
            }
        },
    formIsValid: false, 
    loading: false
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

    checkValidity(value, rules){
        let isValid = true;

        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid; 
    }

    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedOrderForm = {
            ...this.state.orderform
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value 
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement
        updatedFormElement.touched = true; 
        
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
                           changed={(event) => this.inputChangedHandler(event, formElement.id)}
                           invalid={!formElement.config.valid}
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                           /> 
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