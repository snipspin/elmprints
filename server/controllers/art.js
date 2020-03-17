import express from 'express'
require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()

// If user is logged in, req.user has user data
// NOTE: This is the user data from the time the token was issued

// Get route for all art
router.get('/', (req, res) => {
  res.send({ message: 'Show all Art' })
})

// Get route for one piece of art
router.get('/:id', (req, res) => {
  res.send({ message: 'Show one piece of Art' })
})

module.exports = router
