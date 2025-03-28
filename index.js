 const express = require('express')
 require('dotenv').config()
 const workoutRoutes = require('./routes/workout')
 const mongoose = require('mongoose')
 const cors = require('cors')
 const app = express()
const allowedOrigins = [
    'https://workout-frontend-eight.vercel.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// معالج خاص لطلبات OPTIONS
app.options('*', cors());
 // routes
 app.use('/api/workouts', workoutRoutes)
 async function connectDB() {
 try {
 // connect to db
 await mongoose.connect(process.env.MONGO_URI)
 // listen to port
 app.listen(process.env.PORT, () => {
 console.log('connected to db and listening for requests on port', process.env.PORT)
 })
 } catch (error) {
 console.log(error)
 }
 }
 connectDB()
