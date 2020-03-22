require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()
const axios = require('axios');
let artUrl = `https://api.harvardartmuseums.org/object?apikey=${process.env.HAM_API_KEY}`
let searchArtUrl = `https://api.harvardartmuseums.org/object?apikey=${process.env.HAM_API_KEY}&fields=primaryimageurl,baseimageurl,id,title,renditionnumber&size=20&title=`

// If user is logged in, req.user has user data
// NOTE: This is the user data from the time the token was issued

// Get route for all art
router.get('/', (req, res) => {
  axios.get(artUrl)
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

// Post route to search art
router.post('/search', (req, res) => {
  // Get a list of art from HAM
  axios.get(searchArtUrl+req.body.searchQuery)
  .then(function (response) {
    // handle success
    artDataTransformer(response.data.records)
    .then(artData => {
      res.send(artData)
    })
    .catch((err) => { 
      res.status(404).send(err) })
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
        let searchRecords = inputData.filter((record) => {
          if (
            (record.hasOwnProperty('baseimageurl') || record.hasOwnProperty('primaryimageurl'))
            && (record.baseimageurl != null || record.primaryimageurl != null)
            && record.hasOwnProperty('id')
            && (record.hasOwnProperty('renditionnumber') || record.hasOwnProperty('title')) 
          ) 
          {
            return true
          }
        })
        let outputData = searchRecords.map((element) => {
          return {
            title: (element.hasOwnProperty('renditionnumber'))? element.renditionnumber : element.title,
            sourceID:2, 
            imageID: element.id, 
            imagePath: (element.hasOwnProperty('baseimageurl'))? element.baseimageurl : element.primaryimageurl,
            price: calculatePrice(1)
          }
        })
        then(outputData);
      }
      else
      {
          caught(inputData);
      }        
  });
};

const calculatePrice = (factor) => {
  return 39.99
}


module.exports = router