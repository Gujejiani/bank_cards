import React, { useState, useEffect } from 'react'
import classes from './Registration.module.css'
import Buton from '../../Components/UI/Button/button'
import Input from '../../Components/UI/Input/Input'
import useRegister from '../../hooks/register'

import { checkValidity } from '../../Components/validity/validity'

function Registration(props) {

    const [state, setState] = useRegister()

    const [disabled, setDisabled] = useState(true)
    const [show, setShow] = useState(false)
    const [submit, setSubmit] = useState(true)
    const changeHandler = (e, inputType) => {
        let updatedForm = {
            ...state.input
        }
        const updatedFormElement = {
            ...updatedForm[inputType]
        }
        updatedFormElement.value = e.target.value
        updatedForm[inputType] = updatedFormElement
        updatedForm[inputType].valid = checkValidity(updatedFormElement, updatedFormElement, updatedForm.pin.value)
        updatedForm[inputType].touched = true
        setState({ input: updatedForm })

        if (updatedForm.pin.value === updatedForm.ConfirmPin.value && updatedForm.pin.valid && updatedForm.name.valid && updatedForm.IDnum.valid) {

            setDisabled(false)


        } else {
            setDisabled(true)
        }


    }

    const USER = {
        user: state.input.name.value,
        pin: state.input.pin.value
    }
    useEffect(() => {



        if (show) {
            localStorage.setItem('user', JSON.stringify(USER))

            let area = document.querySelector(".Registration_RegContainer__a677h")

            area.style.opacity = 0


            const Timer = setTimeout(() => {
                area.style.display = 'none'
            }, 1000)

            return () => clearTimeout(Timer)
        }
    }, [submit])

    function submitHandler(e) {
        e.preventDefault()
        setShow(true)
        setSubmit(false)
    }


    // push state values in array 
    const inputElmenets = []
    for (let key in state.input) {
        inputElmenets.push({
            id: key,
            config: state.input[key]
        })
    }


    const form = (
        <form onSubmit={submitHandler} >

            {
                inputElmenets.map(key => {


                    return <Input key={key.id} changeHandler={(e) => changeHandler(e, key.id)}  //aq sheileba ageria da this undoda

                        LabelClassName={classes.Label}
                        label={key.config.label}
                        value={key.config.value}
                        type={key.config.type}
                        placeholder={key.config.placeholder}
                        class={[classes.Input, key.config.touched ? key.config?.valid ? classes.Green : classes.Red : null].join(' ')}  ></Input>


                })

            }
            <Buton style={disabled ? classes.Disabled : null} disabled={disabled}>Submit</Buton>

        </form>


    )

    return (
        <div className={classes.Cont} >
            {  show ? <h3 className={show ? classes.PleaseLoginMessage : null}>Please Login</h3> : null}
            <div className={classes.RegContainer} >
                {form}
            </div>
        </div>

    )

}

export default Registration