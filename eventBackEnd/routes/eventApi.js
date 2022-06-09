const express = require('express');
const {getAllTEvent,getTagById,createEvent,updateEventById,deleteEvent} = require('../controllers/event.controllers');
const router = express.Router();
//import Schema
router.get('/event',getAllTEvent);

router.get('/event/:id',getTagById)
//add
router.post('/event',createEvent);

//update
router.put('/event/:id',updateEventById);

//delete
router.delete('/event/:id',deleteEvent)

module.exports = router;