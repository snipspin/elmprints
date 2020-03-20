import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import {ProductInformation} from './dec'

const stripePromise = loadStripe('pk_test_Q4YXjg3hCRD07OqrEqj9g7wf00vVQBzKb9');

type PaymentPageProps = {
    currentProduct: ProductInformation
}

const PaymentPageCom: React.FC<PaymentPageProps> = (props) => {
    return(
        <div>
            PaymentPageCom
            <Elements stripe={stripePromise}>
                <CheckoutForm currentProduct={props.currentProduct} />
            </Elements>
        </div>
    )
}
export default PaymentPageCom