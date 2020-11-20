import { useState } from 'react'



export default function () {

    const [state, setState] = useState({

        input: {
            name: {
                label: 'Name',
                name: 'name',
                type: 'text',
                placeholder: 'user',
                value: '',
                valid: false,
                touched: false,
            },
            IDnum: {
                label: 'ID',
                type: 'number',
                placeholder: 'your ID',
                length: 11,
                value: '',
                valid: false,
                touched: false,
            },
            pin: {
                label: 'Pin',
                type: 'number',
                placeholder: 'Pin',
                length: 4,
                value: '',
                valid: false,
                touched: false,
                match: false,
            },
            ConfirmPin: {
                label: 'confirm Pin',
                type: 'number',
                placeholder: 'Confirm Pin',
                length: 4,
                value: '',
                valid: false,
                touched: false,
                confirm: true,

            },

        },



    })
    return [state, setState]
}

