require('dotenv').config();
const express = require('express');

// You will need `star-model.js`
const starModel = require('./star-model')
// The middleware functions also need to be required
const {validate_age} = require("../middleware/index")

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE STARS
  try {
    const stars = await starModel.find(req.query)
    res.status(200).json(stars)

} catch (error) {
    res.status(500).json({message: "Failed to get all Stars"})
}
});

// Get Single star
router.get('/:id', async (req, res) => {
   // RETURN THE STAR OBJECT
   try {
    const star = await starModel.findById(req.params.id)
    if(star){
        res.status(200).json(star)
    }else{
        res.status(404).json({message: 'Star Not Found'})
      }
} catch (error) {
    res.status(500).json({message:'Failed To get single star'})
}
});

// Add star
router.post('/', validate_age,  async (req, res) => {
    // ADD NEW STAR TO THE DATABASE
    try {
        const star = await starModel.add(req.body)
        if(star){
            res.status(200).json(star)
        }else{
            res.status(404).json({message:'Could Not add New Star'})
        }
    } catch (error) {
        res.status(500).json({message:'Failed To add New Star'})
    }
});

// Update star
router.put('/:id',validate_age, async (req, res) => {
    // UPDATE THE STAR IN THE DATABASE
    try {
        const star = await starModel.update(req.params.id, req.body)
        if(star){
            res.status(200).json(star)
        }else{
            res.status(404).json({message: 'Could Not Update the Star'})
        }
    } catch (error) {
        res.status(500).json({message:'Failed to update Star'})
    }
});

// Delete star
router.delete('/:id', async (req, res) => {
    // DELETE THE STAR FROM THE DATABASE
    try {
        const star = await starModel.remove(req.params.id)
        if(star){
            res.status(200).json(star)
        }else{
            res.status(404).json({message:'Could Not Delete the star'})
        }
    } catch (error) {
        res.status(500).json({message:'Failed to Delete Star'})
    }
});

module.exports = router;
