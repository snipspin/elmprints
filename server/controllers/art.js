require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()
const axios = require('axios');

// If user is logged in, req.user has user data
// NOTE: This is the user data from the time the token was issued

// Get route for all art
router.get('/', (req, res) => {
  let url = 'https://api.harvardartmuseums.org/image?q=width:>500&apikey='+
  axios.get(url)
  .then(function (response) {
    // handle success
    artDataTransformer(response.data.records)
    .then(artData => {
      res.send(artData)
    })
    .catch(err => res.status(200).send(err))
  })
  .catch(function (err) {
    // handle error
    res.status(404).send(err);
  })
})

// Get route for one piece of art
router.get('/:id', (req, res) => {
  let url = `https://api.harvardartmuseums.org/image/${req.params.id}?apikey=${process.env.HAM_API_KEY}`
  axios.get(url)
  .then(function (response) {
    // handle success
    res.send(response.data)
  })
  .catch(function (err) {
    // handle error
    res.status(404).send(err);
  })
})

const artDataTransformer = (inputData) => {
  return new Promise ( (then, caught) => {

      if (inputData !== null) 
      {
        let outputData = inputData.map((element) => {
          return {sourceID:2, imageID: element.id, imagePath: element.baseimageurl}
        })
        then(outputData);
      }
      else
      {
          caught(inputData);
      }        
  });
};


module.exports = router
