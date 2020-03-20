import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'

import CardSection from './CardSection';

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/payment`,
    { cart: [props.currentProduct]})
    //{amount: 1500, cardType: "card"}) 
    // We pay 15€ with a credit card
    console.log(data.data.client_secret)
    const result = await stripe.confirmCardPayment(data.data.client_secret , {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Successfully purchased
        return <Redirect to="/cart/receipt" />
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}