import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import CartCheckOutPage from './CartCheckOutPage'
import {ProductInformation} from './dec'
import {Decoded} from './App'

const stripePromise = loadStripe('pk_test_Q4YXjg3hCRD07OqrEqj9g7wf00vVQBzKb9');

export interface PaymentPageProps {
    currentProduct: ProductInformation,
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const PaymentPageCom: React.FC<PaymentPageProps> = (props) => {
    return(
        <div>
        	<h3>Payment Page</h3>
            <Elements stripe={stripePromise}>
                {(props.user && props.user.shoppingCart.length == 0) &&
                    <CheckoutForm currentProduct={props.currentProduct} user={props.user} />}
                
                {(props.user && props.user.shoppingCart.length >= 1) &&
                    <CartCheckOutPage user={props.user} updateUser={props.updateUser} />
                }
            </Elements>
        </div>
    )
}
export default PaymentPageCom