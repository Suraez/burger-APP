import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from "../../../components/UI/Spinner/Spinner"

import  "./ContactData.css"
import axios from '../../../axios-orders';
import Input from '../../../components/Input/Input';

// redux
import { connect } from 'react-redux'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                                {value: 'cheapest', displayValue: 'Cheapest '}]
                },
                value: '',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for (let identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(err => this.setState({loading: true}))
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules && rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules && rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid
    }

    formChangeHandler = (e, identifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {
            ...updatedOrderForm[identifier]
        };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[identifier] = updatedFormElement;
        let formValid = true;
        for (let key in updatedOrderForm) {
            formValid = updatedOrderForm[key].valid && formValid
        }
        console.log(formValid, "formValid");
        this.setState({orderForm: updatedOrderForm, formIsValid: formValid})
    }

    render () {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        console.log(this.state.formIsValid, "render formIsValid");
        return (
            <div className="ContactData">
                <h4>Your Contact Details</h4>
                {this.state.loading ? <Spinner /> :
                <form>
                    {formElementsArray.map(formElement => {
                        return (
                            <Input
                            key={formElement.id} 
                            elementType={formElement.config.elementType}                             
                            elementConfig={formElement.config.elementConfig}  
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate = {formElement.config.validation}
                            changed={(e) => this.formChangeHandler(e, formElement.id)}
                            />
                        )
                    })}
                    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps)(ContactData)