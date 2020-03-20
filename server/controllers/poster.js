require('dotenv').config()
const axios = require('axios');
const db = require('../models')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const postersUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
const posterBasePrice = 24.99

// Get route for all posters
router.get('/', (req, res) => {
  // Get a list of movies from TMDB
  axios.get(postersUrl)
  .then(function (response) {
    // handle success
    movieDataTransformer(response.data.results)
    .then(movieData => {
      res.send(movieData)
    })
    .catch(err => res.status(200).send(err))
  })
  .catch(function (err) {
    // handle error
    res.status(404).send(err);
  })
})

// Get route for one posters
router.get('/:id', (req, res) => {
  let posterUrl = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`
  axios.get(posterUrl)
  .then(response => {
    console.log(response.data.title)
    console.log('this is the axios response information for a single poster')
    res.send(
      {title: response.data.title,
        sourceID:1, 
        imageID: response.data.id, 
        imagePath: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
        price: calculatePrice(response.data.vote_average)
      })
  })
  .catch(err => res.send(err))
})

const movieDataTransformer = (inputData) => {
  return new Promise ( (then, caught) => {

      if (inputData !== null) 
      {
        let outputData = inputData.map((element) => {
          return {
            title: element.title,
            sourceID:1, 
            imageID: element.id, 
            imagePath: `https://image.tmdb.org/t/p/w500/${element.poster_path}`,
            price: calculatePrice(element.vote_average)
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
  return Math.round(posterBasePrice * (0.1*factor) || posterBasePrice)
}

module.exports = router
