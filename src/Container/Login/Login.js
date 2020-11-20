import classes from './Login.module.css'

import LoginForm from '../../Components/loginForm/form'
import Registration from '../Registration/Registration'
import Layout from '../../Components/layout/layout'
import Card from '../../Components/card/card'
import Dashboard from '../../Components/dashboard/dashboard'
import { useState, useEffect, useCallback } from 'react'
import useCardFormat from '../../hooks/cardsFormat/cardFormat'
import { messageContext } from '../../messageContext/message/message'

const Login = (props) => {

    const [user, setUser] = useState(null)
    const [pin, setpin] = useState([])
    const [movements, setMovements] = useState([])
    const [Balance, setBalance] = useState(1000)
    const [In, setIn] = useState(0)
    const [Out, setOut] = useState(0)
    const [time, setTime] = useState('05:00')
    const [keyType, setKeyType] = useState(false) // if types motch we are rendering spinner for some time
    const [cards, setCard] = useCardFormat()
    const [data, setdata] = useState(null)
    const [message, setMessage] = useState(null)

    const [transactionType, setTransactionType] = useState(null)
    const [token, setToken] = useState(false)


    let Time = 300

    const userEntered = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('token')))


        if (userEntered) {
            setUser(userEntered.user)
            setpin(userEntered.pin)
        }
    }, [])


    useEffect(() => {
        //in this useEffect I rendering log out Time, timer starts whenewer user Logins
        if (token) {
            const interval = setInterval(() => {
                let minute = String(Math.floor(Time / 60)).padStart(2, 0)
                let seconds = String(Time % 60).padStart(2, 0)
                Time--
                setTime(`${minute}:${seconds}`)

                if (Time < 0) {
                    clearInterval(interval)
                    setToken(false)
                    localStorage.setItem('token', false)
                }

            }, 1000)
        }

    }, [token])



    function BalanceIsLowMessage(arg) {
        //if the balance Low sending information to our message
        if (Balance - arg <= 0) {
            setTransactionType('transfer')
            setKeyType('transfer')
            setMessage('LowBalance')

        }
    }

    function transferTypeUiUpdate(balance, data, move) {

        setBalance(balance)       //1 . update total balance
        ResetInput(data) //reset input Field
        setKeyType(false) //end of spinner
        setMessage('succes') //set message to display succes text
        setMovements([...move]) // update movements
        localStorage.setItem('movements', JSON.stringify(movements)) //send items to local Storage
    }


    useEffect(() => {
        //using for the Transfer of money from  the Transfer and Request Card which  in the data state
        if (data) {
            var movemn = movements
            let mov1 = data.config.value                  //first Input In Card
            let mov2 = data.config.secondvalue            //Second Input In Card
            const values = (mov1 !== '' && mov2 !== '')
            if (data.id === 'transfer' && values) {

                if (Balance - mov2 >= 0) {
                    setKeyType('transfer')   //displaying spiner
                    setTransactionType('transfer')
                    const timer = setTimeout(() => {
                        const currentBalance = Balance - mov2;
                        const out = Out - mov2
                        setOut(out)

                        movemn.push({ mov: -mov2, date: new Date().toISOString(), transferTo: mov1 })                        //save the amount and date in the movements State

                        transferTypeUiUpdate(currentBalance, data, movemn) //UI update
                        Time = 300
                    }, 3000)
                    return () => clearTimeout(timer)
                }


                BalanceIsLowMessage(mov2) // sending Balance Low message


            } else if (data.id === 'Request' && values && pin == mov2) {
                setKeyType('Request')
                // && TotalMovements > Balance * 0.2
                setTransactionType('Request')

                const reqTimer = setTimeout(() => {
                    if (mov1 < Balance) {
                        //update UI
                        const currentBalance = Balance + Number(mov1);

                        const transfer = In + Number(data.config.value)
                        setIn(transfer)

                        movemn.push({ mov: Number(data.config.value), date: new Date().toISOString() })

                        transferTypeUiUpdate(currentBalance, data, movemn) //UI update

                        setMessage('Request_Succes') //text for message if loan succes
                    } else {
                        setMessage('Request_Fail')//text for message if loan fails
                    }
                }, 3000)
                return () => clearTimeout(reqTimer)
            } else if (data.id === 'Delete' && values && pin == mov2 && mov1 == user) {
                localStorage.clear()
                setToken(false)
            }


        }
    }, [data])


    useEffect(() => {
        if (message !== null) {
            const Time = setTimeout(() => {

                setMessage(null)
                setKeyType(false)
                localStorage.setItem('balance', JSON.stringify({ in: In, out: Out, Balance: Balance }))  //Seting Ui Balance Fields to Storage
            }, 1000)

            return () => clearTimeout(Time)
        }
    }, [message])

    const StorageMov = JSON.parse(localStorage.getItem('movements'))
    const cashFlow = JSON.parse(localStorage.getItem('balance'))
    useEffect(() => {

        //storing movements from local Storage
        if (StorageMov) {
            setMovements([...StorageMov])
        }
        if (cashFlow) {
            setIn(cashFlow.in)
            setOut(cashFlow.out)
            setBalance(cashFlow.Balance)
        }

    }, [])








    const ChangeHandler = (e, type) => {
        //using data from custom hook cardFormat and updeiting the input values
        const card = {
            ...cards.card
        }
        const uptadedEl = {
            ...card[type]
        }

        if (e.target.type === 'number' && e.target.placeholder !== 'Amount') {
            uptadedEl.secondvalue = e.target.value
        } else {
            uptadedEl.value = e.target.value
        }
        card[type] = uptadedEl
        setCard({ card })


    }


    //function for resetting input fields
    const ResetInput = (arg) => {
        arg.config.value = ''
        arg.config.secondvalue = ''
    }




    const submitHandler = (e, type) => {
        e.preventDefault()

        setdata(type)

    }





    const cardData = []

    for (let key in cards.card) {


        cardData.push({

            id: key,
            config: cards.card[key]
        })
    }







    const Cards = (
        <div>
            { cardData.map(key => {


                return <messageContext.Provider key={key.id} value={key.id === transactionType ? message : null}>
                    <Card

                        spinner={key.id === keyType}
                        type={key.config.type}
                        placeholder={key.config.placeholder}
                        placeholderTwo={key.config.holder}
                        name={key.config.name}
                        transferName={key.config.transferName}
                        amount={key.config.amount}
                        color={key.config.background}
                        firstValue={key.config.value}
                        secValue={key.config.secondvalue}
                        firstInputHandler={(e) => ChangeHandler(e, key.id)}
                        secondHandler={(e) => ChangeHandler(e, key.id)}
                        submitHandler={(e) => submitHandler(e, key)}
                    /> </messageContext.Provider>

            })
            }
        </div>

    )


    const userSignedHandler = (user, pin) => {

        if (token) {


            setUser(userEntered.user)
            setpin(pin)
        } else if (user) {
            setUser(user)
        }

        if (user) {
            localStorage.setItem('token', true)
            setToken(true)
        }

    }


    const toFixed = function (arg) {
        return `${arg.toFixed(2)}$`
    };


    return (


        <div >

            {token ? null : <LoginForm userSigned={userSignedHandler} />}
            <Layout>
                <div className={[classes.Main, token ? null : classes.UserLoggedOut].join(' ')} >

                    <div className={classes.Container} >
                        <h3 className={classes.CurrentBalance} >{toFixed(Balance)}</h3>

                        {Cards}

                        <p className={classes.LogOut} >you will be logged Out in: {time}</p>
                    </div>

                    <div className={classes.secContainer} >

                        <Dashboard changeHandler movements={movements} user={user} Welcome={user ? classes.Message : null} />


                        <p className={classes.In} >In <span>{toFixed(In)}</span> </p> <p className={classes.Out} > Out <span> {toFixed(Out)}</span> </p>
                    </div>
                </div>

            </Layout>
            {token ? null : <Registration />}
        </div>
    )

}

export default Login