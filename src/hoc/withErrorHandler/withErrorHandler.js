import React from 'react'
import { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

export default function withErrorHandler(WrappedComponent, axios) {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(req => req,  error => {
                    this.setState({error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)


        }

        confirmErrorHandler = () =>  {
            this.setState({error: null})
        }
        render () {
            return (
                <>
                    <Modal show={this.state.error} modalClosed={this.confirmErrorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>  
                </>
            )
        }
    }
}
