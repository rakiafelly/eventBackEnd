const express = require('express');
const passport=require('passport')
const {getAllEvent,getTagById,createEvent,updateEvent,deleteEvent, imgUpload} = require('../controllers/event.controllers');
const router = express.Router();
//import Schema
router.get('/event',passport.authenticate('bearer', { session: false })
,getAllEvent);

router.get('/event/:id',passport.authenticate('bearer', { session: false })
,getTagById)
//add
router.post('/event',[imgUpload.single('photo'),passport.authenticate('bearer', { session: false })
],createEvent);
//update
router.put('/event/:id',[imgUpload.single('photo'),passport.authenticate('bearer', { session: false })
],updateEvent);
//delete
router.delete('/event/:id',passport.authenticate('bearer', { session: false })
,deleteEvent)

module.exports = router;