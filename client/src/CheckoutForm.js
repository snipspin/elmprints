import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import {Box, Button, Grid, Checkbox, FormControlLabel, Input, FormControl, InputLabel} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import {useStripe, Elements, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import ProductTile from './ProductTile'
import CardSection from './CardSection';
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

export default function CheckoutForm(props) {
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
  const handleAddToPurchased = () => {
   if(props.user) {
     let email = props.user.email
     let cartContent = [props.currentProduct]
     let data = {
       email,
       cartContent
     }
   
   fetch(`${process.env.REACT_APP_SERVER_URL}/cart/purchased`, {
     method: 'PUT',
     body: JSON.stringify(data),
     headers: {
       'Content-Type': 'application/json'
     }
   })
   .then(response => {
     response.json().then(result => {
       if(response.ok) {
         props.updateUser(result.token)
       } else {
         console.log(`${response.status} ${response.statusText}: ${result.message}`)
       }
     }).catch(err => console.log(err))
   }).catch(err => console.log(err.toString()))
  }}
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
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      setErrorAlert(true)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
       // Successfully purchased
        setPurchaseSuccess(true)
        handleAddToPurchased()
      } else {
        setErrorAlert(true)
      }
    }
  };
  if(!props.user) {
    return <Redirect to="/" />
  }
  if(purchaseSuccess) {
    return <Redirect to="/cart/receipt" />
  }
  const space = '  '
  const nameLabel = `Name for order: ${props.user.firstname} ${props.user.lastname}`
  return (
    <Grid
      container
      spacing={1}
      justify="space-evenly"
      alignContent="center"
    >
      <Grid style={{marginBottom: "20px"}} item xs={6}>
        <ProductTile imageURL={props.currentProduct.imagePath} />
      </Grid>
      <Grid item xs={6}>
        <Grid container 
              spacing={1}
              justify="space-between"
              direction="column"
              alignContent="center"
              style={{border: "2px solid black", maxWidth: "40vw", paddingBottom: "20px", margin: "50px auto"}}
        >
          <div>
            <Grid marginTop="10px" item xs={12}>Shipping address:</Grid>
            <Grid item xs={12}>{props.user.shippingAddress.streetOne}</Grid>
            {props.user.shippingAddress.streetTwo && <Grid item xs={12}>{props.user.shippingAddress.streetTwo}</Grid>}
            <Grid item xs={12}>
              {props.user.shippingAddress.city}<span>{space}</span>
              {props.user.shippingAddress.state}<span>{space}</span>
              {props.user.shippingAddress.zipcode}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel label="Confirm Shipping Address:" value="start" 
              control={<Checkbox value="name-confirm-checkbox" 
              inputProps={{'aria-label': 'Confirm name for order'}} />}
              labelPlacement="start" />
            </Grid>
          </div>
          <div>
            <Grid item xs={12}>Billing address:</Grid>
            <Grid item xs={12}>{props.user.billingAddress.streetOne}</Grid>
            {props.user.billingAddress.streetTwo && <Grid item xs={12}>{props.user.billingAddress.streetTwo}</Grid>}
            <Grid item xs={12}>
              {props.user.billingAddress.city}<span>{space}</span>
              {props.user.billingAddress.state}<span>{space}</span>
              {props.user.billingAddress.zipcode}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel label="Confirm Billing Address:" value="start" 
              control={<Checkbox value="name-confirm-checkbox" 
              inputProps={{'aria-label': 'Confirm name for order'}} />}
              labelPlacement="start" />
            </Grid>
          </div>
          <div>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                <Input name="fullName" onChange={(e) => setFullName(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Snackbar open={errorAlert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                  Payment Failed
                </Alert>
              </Snackbar>
              <form onSubmit={handleSubmit}> 
                  <h4>Card details</h4>
                  <label htmlFor="cardNumber">Card Number</label>
                  <CardNumberElement id="name" options={CARD_ELEMENT_OPTIONS} />
                  <label htmlFor="expiry">Expiration Date</label>
                  <CardExpiryElement id="expiry" options={CARD_ELEMENT_OPTIONS} />
                  <label htmlFor="cvc">CVC</label>
                  <CardCvcElement id="cvc" options={CARD_ELEMENT_OPTIONS} />
                  <label htmlFor="postal">Postal Code</label>
                  <input name="postal" />              
                  <button type="submit" disabled={!stripe}>
                  Pay
                  </button>
              </form>
            </Grid>
          </div>
   
        </Grid>
      </Grid>
    </Grid>
  );
}