// Require needed packages
require('dotenv').config()
let cors = require('cors')
let express = require('express')
let expressJwt = require('express-jwt')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX call)

// Routes
app.use('/auth', expressJwt({
  secret: process.env.JWT_SECRET
}).unless({ // unless defines exceptions to the rule
  path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] },
   	{ url: '/auth/profile/billing', methods: ['PUT']},
   	{ url: '/auth/profile/sameshipping', methods: ['PUT']},
   	{ url: '/auth/profile/shipping', methods: ['PUT']}
  ]
}), require('./controllers/auth'))

app.use('/poster', require('./controllers/poster'))

app.use('/art', require('./controllers/art'))

app.use('/cart', require('./controllers/cart'))

// example secret call for auth:
// app.use('/dogs', expressJwt({ secret: process.env.JWT_SECRET }), require('./controllers/dogs'))

app.get('/faq', (req, res) => {
  res.send({ message: 'FAQ questions and answers' })
})

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
})
