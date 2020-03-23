require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SK)

// If user is logged in, req.user has user data
// NOTE: This is the user data from the time the token was issued
// WARNING: If you update the user info those changes will not be reflected here
// To avoid this, reissue a token when you update user data


// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
router.post('/payment', (req,res) => {
  console.log(req.body);
  
(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.cart[0].price * 100,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  })
  console.log(paymentIntent)
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
router.post('/payment/cart', (req, res) => {
  let totalAmount = 0
  console.log(req.body)

  for(let i = 0; i < req.body.cart.length; i++) {
    totalAmount += (parseInt(req.body.cart[i].price) * 100)
  }
 (async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount.toString(),
      currency: 'usd',
      metadata: {integration_check: 'accept_a_payment'},
    })
    res.send(paymentIntent)
  })()
})
// ? POST /cart for paying - Unclear how Stripe will need payment at the moment
router.put('/', (req, res) => {
  db.User.findOneAndUpdate({email: req.body.email}, { $push: 
    {shoppingCart:
      {
        item: req.body.item,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        imageID: req.body.imageID,
        sourceID: req.body.sourceID
      }

  }}, {new: true}).then(updateUser => {
    console.log(updateUser)
    let token = jwt.sign(updateUser.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 8
    })
    res.status(200).send({token})
  })
  .catch(err=> {
    console.log(err)
    res.status(500).send(err)
  })
})
router.put('/purchased', (req,res) => {
  console.log(req.body)
  let items = [...req.body.cartContent]
  console.log(items)
  db.User.findOneAndUpdate (
    {email: req.body.email},
    {$push: {orderHistory: {$each: [...items]}}},
    {new: true}).then(updatedUser => {
      console.log(updatedUser)
      let token = jwt.sign(updatedUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8
      })
      res.status(200).send({token})
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})
router.put('/remove', (req,res) => {
  db.User.findOneAndUpdate(
    {email: req.body.email},
    {$pull: {shoppingCart: {_id: req.body.productID}}},
    {new: true}).then(updateUser => {
      let token = jwt.sign(updateUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8 
      })
      res.status(200).send({token})
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
})
router.put('/delete', (req, res) => {
  console.log(req.body)
  let idArray = []
  req.body.cartID.forEach(item => {
    idArray.push(item._id)
  })
  console.log(idArray)
  db.User.findOneAndUpdate(
    {email: req.body.email}, 
    {$pullAll: {shoppingCart: req.body.cartID}},
    {new: true}).then(updateUser => {
      let token = jwt.sign(updateUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8
      })
      res.status(200).send({token})
    })
    .catch(err=> {
    console.log(err)
    res.status(500).send(err)
  })
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
