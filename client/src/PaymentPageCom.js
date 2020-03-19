import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

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