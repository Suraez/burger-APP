import React from 'react'

import './BuildControl.css'

export default function BuildControl(props) {
    return (
      <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <div className="Less" onClick={props.removed} disabled={props.disabled}>
          Less
        </div>
        <div className="More" onClick={props.added}>
          More
        </div>
      </div>
    );
}
