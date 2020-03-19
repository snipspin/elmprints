require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()

// If user is logged in, req.user has user data
// NOTE: This is the user data from the time the token was issued
// WARNING: If you update the user info those changes will not be reflected here
// To avoid this, reissue a token when you update user data


// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
router.post('/payment', (req,res) => {
const stripe = require('stripe')(`${process.env.STRIPE_SK}`)

(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  })
  res.send(paymentIntent)
})()
})

// Get route for current state of cart for user
router.get('/', (req, res) => {
  res.send({ message: 'Show current cart' })
})

// Get route for page to pay for items in cart
router.get('/payment', (req, res) => {
  res.send({ message: 'Show payment page for current cart' })
})

// ? POST /cart for paying - Unclear how Stripe will need payment at the moment
router.post('/', (req, res) => {
  res.send({ message: 'This route was from submitting a payment and should deliver confirmation of purchase and redirect to receipt page' })
})

// Get route for receipt page
router.get('/receipt', (req, res) => {
  res.send({ message: 'Show receipt following purchase' })
})


//STRETCH GOALS
// GET /cart/history - history page for recently bought items
// GET /cart/wishlist - wishlist page for items user would like to buy
// GET /cart/create - for creating user’s own poster by uploading an image
// POST /cart/create - uploading information for creating poster


module.exports = router
