require('dotenv').config();
const express = require('express');

// You will need `movie-model.js`
const moviesModel = require ('./movie-model')
// The middleware functions also need to be required
const {validate_movie} = require('../middleware/index')

const router = express.Router();

router.get('/', async (req, res) => {
    // RETURN AN ARRAY WITH ALL THE MOVIES
    try {
        const movies = await moviesModel.find(req.query)
        res.status(200).json(movies)

    } catch (error) {
        res.status(500).json({message: "Failed to get all Movies"})
    }

});

// Get Single Movie
router.get('/:id', async (req, res) => {
    // RETURN THE MOVIE OBJECT
    try {
        const movie = await moviesModel.findById(req.params.id)
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(404).json({message: 'Movie Not Found'})
          }
    } catch (error) {
        res.status(500).json({message:'Failed To get Movie'})
    }
    

});

// Add movie
router.post('/', validate_movie, async (req, res) => {
    // ADD NEW MOVIE TO THE DATABASE
    try {
        const movie = await moviesModel.add(req.body)
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(404).json({message:'Could Not add New Movie'})
        }
    } catch (error) {
        res.status(500).json({message:'Failed To add New Movie'})
    }
});

// Update movie
router.put('/:id', async (req, res) => {
    // UPDATE THE MOVIE IN THE DATABASE
    try {
        const movie = await moviesModel.update(req.params.id, req.body)
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(404).json({message: 'Could Not Update the Movie'})
        }
    } catch (error) {
        res.status(500).json({message:'Failed to update Movie'})
    }
});

// Delete movie
router.delete('/:id', async (req, res) => {
    // DELETE THE MOVIE FROM THE DATABASE
    try {
        const movie = await moviesModel.remove(req.params.id)
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(404).json({message:'Could Not Delete the Movie'})
        }
    } catch (error) {
        res.status(500).json({message:'Failed to Delete Movie'})
    }
    
});

module.exports = router;
