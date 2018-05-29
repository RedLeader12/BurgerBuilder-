import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders';
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false 
    }


    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
            this.setState({loading: true})
        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice, 
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
            this.setState({loading: false})
        })
        .catch(error => {
            this.setState({loading: false})
            console.log(error)
        })
    }

  render() {
    return(
        <div className={classes.ContactData}>
            <h4> Enter Contact Data: </h4> 
            <form> 
                <input className={classes.Input} type="text" name="name" placeholder="YourName"/> 
                <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="Postcode" placeholder="Postcode"/>
                <Button btnType="Success"
                        clicked={this.orderHandler}> Order </Button> 
            </form> 
        </div> 
    )
  }
}

export default ContactData;