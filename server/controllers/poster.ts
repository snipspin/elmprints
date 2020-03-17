import express from 'express'
require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()

// If user is logged in, req.user has user data
// NOTE: This is the user data from the time the token was issued

// Get route for all posters
router.get('/', (req: express.Request, res: express.Response) => {
  res.send({ message: 'Show all Posters' })
})

// Get route for one posters
router.get('/:id', (req: express.Request, res: express.Response) => {
  res.send({ message: 'Show one Poster' })
})

module.exports = router
