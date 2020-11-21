import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from "../../../components/UI/Spinner/Spinner"

import  "./ContactData.css"
import axios from '../../../axios-orders';
import Input from '../../../components/Input/Input';

// redux
import { connect } from 'react-redux'
import { purchaseBurger } from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

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
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (let identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData
        }
        this.props.onOrderClicked(order)
        this.props.history.push('/')
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
                {this.props.loading ? <Spinner /> :
                <form onSubmit={this.orderHandler}>
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
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderClicked: (orderData) => dispatch(purchaseBurger(orderData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))