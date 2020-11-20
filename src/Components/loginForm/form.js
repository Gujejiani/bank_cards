import { useRef, useState } from 'react'
import classes from './form.module.css'



const Form = (props) => {

    const ref = useRef('user')


    //...



    const [user, setUser] = useState(null)
    const [pin, setPin] = useState(null)


    function submitHandler(e) {

        e.preventDefault()

        if (localStorage.getItem("user") !== null) {

            let validate = JSON.parse(localStorage.getItem('user'))
            if (validate.user === user && validate.pin === pin) {

                props.userSigned(user, pin)

            } else {
                console.log('user Is not Authanticated');

            }

        }
    }

    return (
        <div>
            <form id="form" onSubmit={submitHandler} >
                <div className={classes.Container}>

                    <input ref={ref} type="text" onChange={(e) => setUser(e.target.value)} placeholder="user" className={classes.Input} ></input>
                    <input onChange={(e) => setPin(e.target.value)} type="number" placeholder="pin" className={classes.Input} ></input>
                    <i onClick={submitHandler} className="fas fa-arrow-right fa-2x"></i>
                    <button type="submit" ></button>
                </div>
            </form>
        </div>
    )
}


export default Form