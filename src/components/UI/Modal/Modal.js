import React from 'react'
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'


export default class Modal extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render() {
    const {
      props,
    } = this;

    return (
      <>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div
          className="Modal"
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0",
          }}
        >
          {props.children}
        </div>
      </>
    );
  }
}
