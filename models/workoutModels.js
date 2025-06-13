const mongoose = require('mongoose')
const workoutSchema = new mongoose.Schema({
    title: { //workout name
        type: String,
        required: true
    },
    reps: { // how many time u did the workout
        type: Number,
        required: true
    },
    load: { // how much weight 
        type: Number,
        required: true
    },
    user_id:{
        type:String,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)