import { useState } from 'react'



export default function () {
    const [cards, setCard] = useState({
        card: {
            transfer: {
                type: 'text',
                name: 'Transfer Money',
                placeholder: 'to',
                holder: 'amount',
                transferName: 'transfer to',
                amount: 'amount',
                background: '#FFA500',
                value: '',
                secondvalue: '',

            },
            Request: {
                type: 'number',
                name: 'Request Loan',
                placeholder: 'Amount',
                holder: 'Pin',
                transferName: 'Amount',
                amount: 'Pin',
                background: '#004E7C',
                value: '',
                secondvalue: '',


            },
            Delete: {
                type: 'text',
                name: 'Delete account',
                placeholder: 'user',
                holder: 'Confirm pin',
                transferName: 'user',
                amount: 'pin',
                background: '#781A44',
                value: '',
                secondvalue: '',


            }

        }
    })
    return [cards, setCard]
}