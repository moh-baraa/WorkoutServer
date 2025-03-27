const express = require('express')
const router = express.Router()
//const Workout = require('../models/workoutModels')
//const mongoose = require('mongoose')
const {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController.js')

//Get all workouts
router.get('/', getWorkouts)

// Get a single workout
router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router