import React from 'react'

import './Button.css';

export default function Button(props) {
    const classes = ["Button"];
    classes.push(props.btnType === "Success" ? "Success" : "Danger");
    return (
        <div onClick={props.clicked} className={classes.join(' ')}>
            {props.children}
        </div>
    )
}
