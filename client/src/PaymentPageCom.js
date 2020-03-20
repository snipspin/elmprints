import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_Q4YXjg3hCRD07OqrEqj9g7wf00vVQBzKb9');

function PaymentPageCom() {
    return(
        <div>
            PaymentPageCom
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}
export default PaymentPageCom