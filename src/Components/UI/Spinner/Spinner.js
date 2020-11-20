
import Aux from '../../../hoc/Auxhilary'
import './Spinner.css'


const Spinner = () => {
    return (
        <Aux >
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Aux>
    )
}

export default Spinner