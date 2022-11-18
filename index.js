const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Auth = require('./routes/auth');
const Hotels= require('./routes/hotels');
const Rooms = require('./routes/rooms');
const Users = require('./routes/rooms');

dotenv.config()
app.use(express.json())


// for online connection
// const connect = async ()=>{
//     try{
//         await mongoose.connect(process.env.MONOG_URI);
//         console.log("DB is Connected")
//     }catch(err){
//         throw err;
//     }
// }

// mongoose.connection.on('disconnected', ()=>{
//     console.log("DB is disconneced")
// })

// mongoose.connection.on('connected', ()=>{
//     console.log("Mongo Connected")
// })

// local db connection
mongoose.connect(process.env.MONOG_URI, (err)=>{
    if(!err){
        console.log("DB is Connected")
    }
})


// initalize routes
app.use('/api', Auth);
app.use('/api', Hotels);
app.use('/api', Rooms);
app.use('/api', Users);


app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack
    })
})

app.use('*', (req, res)=>{
    res.json({ message :  "please check route"})
})


app.listen(8000, ()=>{
    console.log("Server is running... at 8000")
})