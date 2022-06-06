const express = require('express');
const Event = require('../models/event');
const router = express.Router();
//import Schema
router.get('/event', async (req, res, next) => {
    const event = await Event.find()
    res.send(event)
})

router.get('/event/:id', async(req, res, next) => {
    const event=await Event.findById(req.params.id);
    res.send(event);
    
})
//add
router.post('/event', async(req, res, next) => {
const event=await Event.create(req.body);
res.send(event)
})

//update
router.put('/event/:id', async(req, res, next) => {
const event=await Event.findByIdAndUpdate(req.params.id,req.body) 
res.send(event);

})

//delete
router.delete('/event/:id',async (req, res, next) => {
const event=await Event.findByIdAndRemove(req.params.id);
res.send(event);

})

module.exports = router;