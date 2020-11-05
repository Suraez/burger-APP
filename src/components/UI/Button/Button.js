import React from 'react'

import './Button.css';

export default function Button(props) {
    const classes = ["Button"];
    classes.push(props.btnType === "Success" ? "Success" : "Danger");
    console.log("button disabled", props.disabled);
    return (
      <button
        onClick={props.clicked}
        disabled={props.disabled}
        className={classes.join(" ")}
      >
        {props.children}
      </button>
    );
}
