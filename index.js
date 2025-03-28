const express = require('express')
const workoutRoutes = require('./routes/workouts.js')
const mongoose = require('mongoose')
// express app
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors({ origin: '*' })) // ← السماح للجميع (أو ضع الدومين فقط)
app.use(express.json())
// create an api
// app.get('/', (req, res)=>{ // req is request (data from user in url)
//     // res is responde from the server to the user
//     res.json({mssg: 'Welcom to the app'})
// })

// middleware (middle between client and server)
app.use(express.json())
//routes
app.use('/api/workouts', workoutRoutes)


// listen for requests
// app.listen(4000, ()=>{
//     console.log('listening on port 4000')
// })

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
