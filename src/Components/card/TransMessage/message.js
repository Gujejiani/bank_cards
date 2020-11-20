import classes from './message.module.css'
import Aux from '../../../hoc/Auxhilary'
import { useContext, useState, useEffect } from 'react'
import { messageContext } from '../../../messageContext/message/message'





const Message = (props) => {
    let mes = useContext(messageContext)
    const [Message, setMessage] = useState(null)
    const [Display, setDisplay] = useState(null) //displays Message
    const [style, setsTyle] = useState(null)

    useEffect(() => {
        setMessage(mes)
        const messageItem = displayMessage(Message)
        setDisplay(messageItem)



    }, [mes, Message])


    useEffect(() => {
        // if (Message) {


        //     const Timer = setTimeout(() => {
        //         setMessage(null)

        //     }, 1000)
        //     return () => clearTimeout(Timer)
        // }

    }, [Message])


    let message

    const displayMessage = function (mes) {

        switch (mes) {

            case 'succes':

                setsTyle(classes.Succes)
                return message = 'Transaction Complited'

            case 'file':
                return message = 'Transaction Filed'
            case 'LowBalance':

                setsTyle(classes.Fail)
                return message = 'Not Enough Money'
            case 'Request_Succes':
                setsTyle(classes.Succes)
                return 'the loan is approved'
            case 'Request_Fail':
                setsTyle(classes.Fail)
                return 'the loan was not approved'
            default:
                return message = ''

        }
    }


    return (
        <Aux>
            <div className={classes.Container} >

                <p className={Message ? style : classes.Hide} >{Display}</p>
            </div>
        </Aux>
    )



}

export default Message