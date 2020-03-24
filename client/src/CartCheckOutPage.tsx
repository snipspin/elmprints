import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import {Button, Grid, Checkbox, FormControlLabel, Input, FormControl, InputLabel} from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import {useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js';
import axios, { AxiosResponse } from 'axios'
import CartItem from './CartItem'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import {Decoded} from './App'
import {Error, ErrorWithLink} from './Error'
import {StripeCardNumberElement} from '@stripe/stripe-js';

type CartCheckOutPageProps = {
  user: Decoded | null,
  updateUser: (newToken: string | null) => void
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      iconColor: "black",
      fontSize: "16px",
      textAlign: "left",
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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const CartCheckOutPage: React.FC<CartCheckOutPageProps> = (props) => {

  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false)
  const [fullName, setFullName] = useState<string>('')
  const [errorAlert, setErrorAlert] = useState<boolean>(false)
  useEffect(() => {
    
  }, [fullName, purchaseSuccess])
  const space= "  " 
  const stripe = useStripe();
  const elements = useElements();
  
  if (props.user === null) {
    return (
      <Error title="Not logged in" body="You need to be logged in to see this content" />
    )
  }

  if (props.user.shippingAddress == null
    || props.user.shippingAddress.city == ''
    || props.user.shippingAddress.state == ''
    || props.user.shippingAddress.streetOne == ''
    ) {
    console.log('Error')
    return (
      <ErrorWithLink title="No shipping address found" body="You need to provide shipping information in your profile" linkTo={{title:'Profile', to:'/profile'}} />
    )
  }

  if (props.user.billingAddress == null
    || props.user.billingAddress.city == ''
    || props.user.billingAddress.state == ''
    || props.user.billingAddress.streetOne == ''
    ) {
    console.log('Error')
    return (
      <ErrorWithLink title="No billing address found" body="You need to provide billing information in your profile" linkTo={{title:'Profile', to:'/profile'}} />
    )
  }
  
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setErrorAlert(false);
}
  const handleAddToPurchased = ():void => {
 	if(props.user) {
 		let email = props.user.email
 		let cartContent = [...props.user.shoppingCart]
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
  
  const handleDeleteCart = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
  	e.preventDefault()
    if(props.user){
   		let email: string = props.user.email
        let cartID = props.user.shoppingCart    
        let data = {
          email,
          cartID
        }          
            
        fetch(`${process.env.REACT_APP_SERVER_URL}/cart/delete`, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
          	'Content-Type' : 'application/json'
          }
        })
        .then((response) => {
          response.json().then(result => {
            if(response.ok) {
               props.updateUser(result.token)                   
            } else {
               console.log(`${response.status} ${response.statusText}: ${result.message}`)
            }
          }).catch(err => console.log(err))
        }).catch(err => {
       	  console.log(`Error: ${err.toString()}`)
        })
    }               
  }   
  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if(props.user) {
      if(props.user.shoppingCart.length < 1) {
        setErrorAlert(true)
        return
      }
    }
    if (props.user?.shoppingCart != null) {
      const data: AxiosResponse<any> = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/payment/cart`,
      { cart: [...props.user.shoppingCart]})
    
    console.log(data.data.client_secret)
    const cardElement: StripeCardNumberElement|null = elements.getElement(CardNumberElement)
    if (cardElement != null) {
      const {paymentIntent, error} = await stripe.confirmCardPayment(data.data.client_secret , {
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

        if (error) {
          // Show error to your customer (e.g., insufficient funds)
          setErrorAlert(true)
          console.log(error.message);
        } else {
          // The payment has been processed!
          if (paymentIntent != undefined && paymentIntent.status === 'succeeded') {
          // Successfully purchased
            setPurchaseSuccess(true)
          } else {
            setErrorAlert(true)
          }
        }
      }
    }
  }
  
  if(purchaseSuccess) {
  	handleAddToPurchased()
    return <Redirect to="/cart/receipt" />
  }

  return (
  	<Grid
      container
      spacing={1}
      justify="space-evenly"
      alignContent="center"
    >
      <Grid item md={6} xs={12}>
        <div className="shoppingCartDiv">
        	<h3>Shopping Cart</h3>
            {props.user.shoppingCart.map((currItem,i) => (
              <CartItem
              key={i}
              user={props.user}
              updateUser={props.updateUser}
              id={currItem._id} 
              item={currItem.item}
              imgUrl={currItem.imgUrl}
              price={currItem.price}
              imageID={currItem.imageID}
              sourceID={currItem.sourceID}
              />
            ))}
          <Button style={{marginTop: "20px", marginBottom: "20px"}} variant="contained" color="primary" onClick={e => handleDeleteCart(e)}>Clear Cart</Button>
        </div>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container 
        spacing={1}
        justify="space-between"
        direction="column"
        alignContent="center"
        className="checkOutCustomerInfo"
        style={{backgroundColor: "#f1e2d6", border: "2px solid black", padding: "20px", margin: "15px auto"}}
        >
          <div className="shippingAdd">
            <Grid item xs={12}><h4>Shipping address:</h4></Grid>
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
          <div className="billingAdd">
            <Grid item xs={12}><h4>Billing address:</h4></Grid>
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
          <div className="cardDetailsDiv">
            <Grid item xs={12}>
              <h2 className="cardDetails">Card Details:</h2>
              <FormControl>
                <InputLabel className="fullNameLabel" htmlFor="fullName">Full Name</InputLabel>
                <Input className="fullName" name="fullName" onChange={(e) => setFullName(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Snackbar open={errorAlert} autoHideDuration={6000} onClose={(e)=>handleClose(e)}>
                <Alert onClose={(e)=>handleClose(e)} severity="error">
                  Payment Failed
                </Alert>
              </Snackbar>
              <form onSubmit={(e)=>handleSubmit(e)}> 
                  <label htmlFor="cardNumber">Card Number</label>
                  <CardNumberElement className="cardNumber" id="name" options={CARD_ELEMENT_OPTIONS} />
                  <label htmlFor="expiry">Expiration Date</label>
                  <CardExpiryElement className="expiry" id="expiry" options={CARD_ELEMENT_OPTIONS} />
                  <label htmlFor="cvc">CVC</label>
                  <CardCvcElement className="cvc" id="cvc" options={CARD_ELEMENT_OPTIONS} />
                  <label className="postalLabel" htmlFor="postal">Postal Code</label>
                  <input className="postal" placeholder="Postal Code" name="postal" />              
                  <button className="payBtn" type="submit" disabled={!stripe}>
                  Pay
                  </button>
              </form>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CartCheckOutPage
