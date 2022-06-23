const express = require('express');
const {getAllEvent,getTagById,createEvent,updateEvent,deleteEvent, imgUpload} = require('../controllers/event.controllers');
const router = express.Router();
//import Schema
router.get('/event',getAllEvent);

router.get('/event/:id',getTagById)
//add
router.post('/event',imgUpload.single('photo'),createEvent);
//update
router.put('/event/:id',imgUpload.single('photo'),updateEvent);
//delete
router.delete('/event/:id',deleteEvent)

module.exports = router;