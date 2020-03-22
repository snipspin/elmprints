import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import {Box, Button, Grid, Checkbox, FormControlLabel, Input, FormControl, InputLabel} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import {useStripe, Elements, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import ProductTile from './ProductTile'
import CardSection from './CardSection'
import MuiAlert from '@material-ui/lab/Alert'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      iconColor: "black",
      fontSize: "16px",
      textAlign: "center",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    complete: {
      color: "#05a81b",
      iconColor: "#05a81b"
    },
    invalid: {
      color: "#fa0c0c",
      iconColor: "#fa0c0c",
    },
  },
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function CartCheckOutPage(props) {
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)
  const [fullName, setFullName] = useState('')
  const [errorAlert, setErrorAlert] = useState(false)
  useEffect(() => {

  }, [fullName, purchaseSuccess])
  const stripe = useStripe();
  const elements = useElements();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorAlert(false)
  }
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/payment/cart`,
    { cart: [props.currentProduct]})
    //{amount: 1500, cardType: "card"}) 
    // We pay 15€ with a credit card
    console.log(data.data.client_secret)
    const cardElement = elements.getElement(CardNumberElement)
    const result = await stripe.confirmCardPayment(data.data.client_secret , {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: fullName,
          address: {
            city: props.user.billingAddress.city,
            country: 'US',
            line1: props.user.billingAddress.streetOne,
            line2: props.user.billingAddress.streetTwo,
            postal_code: props.user.billingAddress.zipcode,
            state: props.user.billingAddress.state
          },
          email: props.user.email
        },
      }
    })

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      setErrorAlert(true)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
       // Successfully purchased
        setPurchaseSuccess(true)
      } else {
        setErrorAlert(true)
      }
    }
  }
  if(purchaseSuccess) {
    return <Redirect to="/cart/receipt" />
  }
  const nameLabel = `Name for order: ${props.user.firstname} ${props.user.lastname}`
  return (
  	<Grid
      container
      spacing={1}
      justify="space-evenly"
      alignContent="center"
    >
    </Grid>
  )
}
