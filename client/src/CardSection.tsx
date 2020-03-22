import React from 'react';
import {CardNumberElement, CardExpiryElement, CardCvcElement}from '@stripe/react-stripe-js';
// import './CardSectionStyles.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      iconColor: "black",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    complete: {
      color: "#44eb84",
      iconColor: "#44eb84"
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const CardSection = () => {
  return (
    <div>
      <h4>Card detait</h4>
      <label htmlFor="cardNumber">Full Name</label>
      <CardNumberElement id="name" options={CARD_ELEMENT_OPTIONS} />
      <label htmlFor="expiry">Card Number</label>
      <CardExpiryElement id="expiry" options={CARD_ELEMENT_OPTIONS} />
      <label htmlFor="cvc">CVC</label>
      <CardCvcElement id="cvc" options={CARD_ELEMENT_OPTIONS} />
      <label htmlFor="postal">Postal Code</label>
      <input name="postal" />
    </div>
  );
};

export default CardSection;
