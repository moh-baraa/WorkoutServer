const express = require('express')
require('dotenv').config()
const workoutRoutes = require('./routes/workouts.js')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')

const app = express()
app.use(cors())

app.use(express.json())
app.use('/api/workouts', workoutRoutes)
app.use('/api/user',userRoutes)

async function connectDb() {
    try {
        //connect to db
        await mongoose.connect(process.env.MONGO_URI)
        //listen to port
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening for requests on port', process.env.PORT)
        })
    }
    catch (error) {
        console.log(error.message)
    }
}
connectDb();
