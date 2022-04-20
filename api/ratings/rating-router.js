require('dotenv').config();
const express = require('express');

// You will need `rating-model.js`
const ratingModel = require('./rating-model')
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
    // RETURN AN ARRAY WITH ALL THE RATINGS
    try {
        const ratings = await ratingModel.find(req.query)
        res.status(200).json(ratings)
        
    } catch (error) {
        res.status(500).json({message:'Failed To get Ratings'})    }
});

// Get Single rating
router.get('/:id', async (req, res) => {
    // RETURN THE RATING OBJECT
    try {
        const rating = await ratingModel.findById(req.params.id)
        if(rating){
            res.status(200).json(rating)
        }else{
            res.status(404).json({message: 'Rating Not Found'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed To get Single Movie'})
    }
   
});

// Add rating
router.post('/', async (req, res) => {
    // ADD NEW RATING TO THE DATABASE
    try {
        const movie = await ratingModel.add(req.body);
        if(movie) {
            res.status(200).json(movie)
        }else{
            res.status(404).json({message: 'Could Not add New rating'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to add new Rating'})
    }
});

// Update rating
router.put('/:id', async (req, res) => {
    // UPDATE THE RATING IN THE DATABASE
    try {
        const rating = await ratingModel.update(req.params.id, req.body)
        if(rating){
            res.status(200).json(rating)
        }else{
            res.status(404).json({message: 'Could Not Update the rating'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to update The Rating'})
    }
});

// Delete rating
router.delete('/:id', async (req, res) => {
    // DELETE THE RATING FROM THE DATABASE
    try {
        const rating = await ratingModel.remove(req.params.id)
        if(rating){
            res.status(200).json(rating)
        }else{
            res.status(404).json({message:'Could Not Delete the Rating'})
        }
    } catch (error) {
        res.status(500).json({message:'Failed to Delete rating'})
    }
});

module.exports = router;
