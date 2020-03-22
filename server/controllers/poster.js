require('dotenv').config()
const axios = require('axios');
const db = require('../models')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const postersUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
const postersSearchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=`
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

// Post route to search posters
router.post('/search', (req, res) => {
  // Get a list of movies from TMDB
  axios.get(postersSearchUrl+req.body.searchQuery)
  .then(function (response) {
    // handle success
    movieSearchTransformer(response.data.results)
    .then(movieData => {
      res.send(movieData)
    })
    .catch((err) => { 
      res.status(404).send(err) })
  })
  .catch(function (err) {
    // handle error
    res.status(404).send(err);
  })
})

const movieDataTransformer = (inputData) => {
  return new Promise ( (then, caught) => {

      if (inputData !== null) 
      {
        let posters = inputData.filter((poster) => {
          if (
            poster.hasOwnProperty('poster_path') 
            && poster.poster_path != null
          ){
            return true
          }
        })
        let outputData = posters.map((element) => {
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

const movieSearchTransformer = (inputData) => {
  return new Promise ( (then, caught) => {

      if (inputData !== null) 
      {
        let filteredMovies = inputData.filter((element) => {
          if (element.hasOwnProperty('poster_path') 
          && element.poster_path != null
          ) 
          {
            return element
          }
        })
        .map((element) => {
          return {
            title: element.title,
            sourceID:1, 
            imageID: element.id, 
            imagePath: `https://image.tmdb.org/t/p/w500/${element.poster_path}`,
            price: calculatePrice(element.vote_average)
          }
        })

        let persons = inputData.filter((element) => {
          return element.media_type == 'person'
        })
        .filter((person) => {
          return person.hasOwnProperty('known_for')
        })
        let personsMovies = persons.map((person)=> {
          return person.known_for
        })
        let movies = personsMovies.flat()

        let filteredActorsMovies = movies.map((transformedMovie) => {
          let title = (transformedMovie.hasOwnProperty('title'))? transformedMovie.title : ((transformedMovie.hasOwnProperty('original_name')) ? transformedMovie.original_name : 'Unknown')
          return {
            title: title,
            sourceID:1, 
            imageID: transformedMovie.id, 
            imagePath: `https://image.tmdb.org/t/p/w500/${transformedMovie.poster_path}`,
            price: calculatePrice(transformedMovie.vote_average)
          }
        })
       
        then([...filteredMovies, ...filteredActorsMovies]);
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
