import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from "../../../components/UI/Spinner/Spinner"

import  "./ContactData.css"
import axios from '../../../axios-orders';

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

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.state.totalPrice,
            user: {
                name: 'Suraj',
                address: {
                    city: 'Janakpur',
                    zipCode: '12121',
                    country: 'Nepal'
                }
            },
            deliveryMethod: 'fastest',
            paymentMethod: 'cash upon delivery'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(err => this.setState({loading: true}))
    }

    render () {
        return (
            <div className="ContactData">
                <h4>Your Contact Details</h4>
                {this.state.loading ? <Spinner /> :
                <form>
                    <input type="text" name="name" placeholder="Your Name please" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postalcode" placeholder="Your Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
                }
            </div>
        )
    }
}
export default ContactData