import classes from './card.module.css'
import Spinner from '../UI/Spinner/Spinner'
import Message from './TransMessage/message'
const Card = (props) => {


    return (

        <div className={classes.Card} style={{ backgroundColor: props.color }} >
            <form onSubmit={props.submitHandler} >
                <div className={props.spinner ? classes.Spiner : classes.HideSpiner}><Spinner /></div>
                <Message />
                <label  >{props.name}</label>
                <input onChange={props.firstInputHandler} value={props.firstValue} placeholder={props.placeholder} type={props.type} name="" id="" />
                <input onChange={props.secondHandler} value={props.secValue} placeholder={props.placeholderTwo} type="number" name="" id="" />
                <span className={classes.To} >{props.transferName}</span>  <span className={classes.Amount}>{props.amount}</span>
                <button type='submit'></button>
                <i onClick={props.submitHandler} className="fas fa-arrow-right fa-2x"  ></i>
            </form>
        </div>





    )



}


export default Card