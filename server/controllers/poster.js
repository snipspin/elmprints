require('dotenv').config()
const axios = require('axios');
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()
let postersUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
let posterUrl = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`

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
  axios.get(posterUrl)
  .then(response => {
    res.send({sourceID:1, imageID: response.data.id, imagePath: `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`})
  })
  .catch(err => res.send(err))
})

const movieDataTransformer = (inputData) => {
  return new Promise ( (then, caught) => {

      if (inputData !== null) 
      {
        let outputData = inputData.map((element) => {
          return {sourceID:1, imageID: element.id, imagePath: `https://image.tmdb.org/t/p/w500/${element.poster_path}`}
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
