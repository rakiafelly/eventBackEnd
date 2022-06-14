const express = require('express');
const {getAllEvent,getTagById,createEvent,updateEvent,deleteEvent} = require('../controllers/event.controllers');
const router = express.Router();
//import Schema
router.get('/event',getAllEvent);

router.get('/event/:id',getTagById)
//add
router.post('/event',createEvent);

//update
router.put('/event/:id',updateEvent);

//delete
router.delete('/event/:id',deleteEvent)

module.exports = router;