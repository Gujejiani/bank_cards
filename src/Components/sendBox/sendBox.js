import classes from './sendBox.module.css'


const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const dateFormat = `${day}/${month}/${year}`







const box = (props) => {

    const calcDayPassed = (date1, date2) => {
        return Math.floor(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)))
    }


    let k = calcDayPassed(date, props.dateTwo)

    return <div className={classes.Container} >
        <div className={props.DepositType} ><p className={classes.Depo} > {props.NameOfTransfer}</p></div>

        <p className={classes.Date} > {dateFormat}</p>
        <p className={classes.Transferd} >{props.Money}</p>
    </div>
}


export default box