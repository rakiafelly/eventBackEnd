const express = require('express');
const passport=require('passport')
const {getAllTAgs,getTagBYId,createTag,updateTagById,deleteTag} = require('../controllers/tag.controller');
const router = express.Router();
//import Schema
router.get('/tag',passport.authenticate('bearer', { session: false })
, getAllTAgs);

router.get('/tag/:id',passport.authenticate('bearer', { session: false })
, getTagBYId);
//add
router.post('/tag',passport.authenticate('bearer', { session: false })
,createTag);

//update
router.put('/tag/:id',passport.authenticate('bearer', { session: false })
,updateTagById)

//delete
router.delete('/tag/:id',passport.authenticate('bearer', { session: false })
,deleteTag);

module.exports = router;