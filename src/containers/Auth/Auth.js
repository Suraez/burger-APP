import React, { Component } from 'react'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/Input/Input'
import "./Auth.css"
import { connect } from 'react-redux'

import { auth, setAuthRedirectPath } from  '../../store/actions/index' 
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }
    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
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

    inputChangedHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,
                [controlName]: {
                    ...this.state.controls[controlName],
                    value: e.target.value,
                    valid:  this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                    touched: true
                }  
        }
        this.setState({controls: updatedControls})
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }
    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(e) => this.inputChangedHandler(e, formElement.id)}
              />
            );
        })

        if (this.props.loading) {
            form = <Spinner />

        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
          <div className="Auth">
              {/* { this.props.isAuthenticated && <Redirect to="/" /> } */}
              {authRedirect}
              { errorMessage }
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">Submit</Button>
            </form>
            <Button clicked={this.switchAuthModeHandler} btnType="Danger">
              SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
            </Button>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burger.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);