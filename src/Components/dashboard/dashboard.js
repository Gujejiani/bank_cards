// import classes from '*.module.css'
import classes from './dashboard.module.css'
import Box from '../../Components/sendBox/sendBox'
import React, { useState, useEffect } from 'react'


const newtime = new Date()


const day = `${newtime.getDate()}`.padStart(2, '0')
const year = newtime.getFullYear()
const month = `${newtime.getMonth() + 1}`.padStart(2, '0')
const hour = newtime.getHours()
const minute = `${newtime.getMinutes()}`.padStart(2, '0')

const time = `${day}/${month}/${year} ${hour}:${minute}`




const Dashboard = (props) => {


    const [movementS, setMovements] = useState([])




    // const StorageMov = JSON.parse(localStorage.getItem('movements'))
    useEffect(() => {


        setMovements([...props.movements])



    }, [props.movements])



    const movement = (
        <React.Fragment>
            {


                movementS.map((el, index) => {


                    const Cash = `${el.mov.toFixed(2)}$`


                    return <Box dateTwo={el.date} DepositType={el.mov <= 0 ? classes.WithDrawal : classes.Deposit} NameOfTransfer={el.mov <= 0 ? el.transferTo : 'Deposit'} key={index + 120} Money={Cash} />
                })

            }
        </React.Fragment>


    )





    return <div>
        <div className={classes.Container}>
            <div className={classes.Welcome} >Welcome back {props.user}</div>
            <div className={classes.Balance} >
                <div> Current Balance</div>
                <span>{time}</span>
            </div>

            {movement}



            {/* <div className={classes.Section}>

            </div> */}
        </div>
    </div>
}



export default Dashboard