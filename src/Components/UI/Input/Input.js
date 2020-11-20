

import React from 'react'
import classes from './Input.module.css'







const input = (props) => {


    return (
        <React.Fragment>

            <label className={props.LabelClassName} >{props.label}</label>
            <input key={props.id} onChange={props.changeHandler}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                className={props.class}  ></input>
        </React.Fragment>

    )


}



export default input