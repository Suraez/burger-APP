import React from 'react'
import { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

export default function withErrorHandler(WrappedComponent, axios) {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            }, error => error)
            axios.interceptors.response.use(req => req,  error => {
                    this.setState({error})
            })
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
