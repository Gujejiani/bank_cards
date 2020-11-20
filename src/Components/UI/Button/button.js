import classes from './button.module.css'


const button = (props) => {

    const style = [classes.Buton, props.style].join(' ')

    return (
        <button className={style} type="submit" disabled={props.disabled} >{props.children}</button>
    )
}

export default button