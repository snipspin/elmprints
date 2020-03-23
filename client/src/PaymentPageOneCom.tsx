import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import {ProductInformation} from './dec'
import {Decoded} from './App'

const stripePromise = loadStripe('pk_test_Q4YXjg3hCRD07OqrEqj9g7wf00vVQBzKb9');

export interface PaymentPageOneProps {
    currentProduct: ProductInformation,
    user: Decoded | null,
    updateUser: (newToken: string | null) => void

}

const PaymentPageOneCom: React.FC<PaymentPageOneProps> = (props) => {
    return(
        <div>
        	<h3>Payment Page</h3>
            <Elements stripe={stripePromise}>
                <CheckoutForm currentProduct={props.currentProduct} user={props.user} />}
            </Elements>
        </div>
    )
}
export default PaymentPageOneCom