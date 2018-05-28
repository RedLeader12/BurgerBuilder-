import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

  render() {
    return(
        <div>
            <h4> Enter Contact Data: </h4> 
            <form> 
                <input type="text" name="name" placeholder="YourName"/> 
                <input type="text" name="email" placeholder="Your Email"/>
                <input type="text" name="street" placeholder="Street"/>
                <input type="text" name="Postcode" placeholder="Postcode"/>
                <Button btnType="Success"> Order </Button> 
            </form> 
        </div> 
    )
  }
}

export default ContactData;