const router = require('express').Router()
const HotelModel = require('../models/hotel');


// create
router.post('/create', async (req, res)=>{
    const newHotel = new HotelModel(req.body)
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

// update
router.put('/update/:id', async (req, res)=>{

    // res.send("working...")
    try{
        const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true} );
        res.status(200).json(updatedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete
router.put('/delete/:id', async (req, res)=>{

    try{
        const DeletedHotel = await HotelModel.findByIdAndRemove(req.params.id);
        res.status(200).json(DeletedHotel)
    }catch(err){
        res.status(500).json(err)
    }
})

// get single
router.get('/hotel/:id', async (req, res)=>{
    try{
        const SingleHotel = await HotelModel.findById(req.params.id);
        res.status(200).json(SingleHotel)
    }catch(err){
        res.status(500).json(err)
    }
})


// get all
router.get('/hotels', async (req, res)=>{
    try{
        const HotelList = await HotelModel.find();
        res.status(200).json(HotelList)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;