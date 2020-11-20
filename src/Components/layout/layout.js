
import React from 'react'
import classes from './layout.module.css'


const layout = (props) => {

    return (
        <React.Fragment >
            <div className={classes.Layout} >

                {props.children}
            </div>

        </React.Fragment>
    )

}


export default layout