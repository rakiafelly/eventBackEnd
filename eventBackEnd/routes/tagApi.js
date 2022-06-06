const express = require('express');
const Tag = require('../models/tag');
const router = express.Router();
//import Schema
router.get('/tag', async (req, res, next) => {
    const tag = await Tag.find()
    res.send(tag)
})

router.get('/tag/:id', async(req, res, next) => {
    const tag=await Tag.findById(req.params.id);
    res.send(tag);
    
})
//add
router.post('/tag', async(req, res, next) => {
const tag=await Tag.create(req.body);
res.send(tag)
})

//update
router.put('/tag/:id', async(req, res, next) => {
const tag=await Tag.findByIdAndUpdate(req.params.id,req.body) 
res.send(tag);

})

//delete
router.delete('/tag/:id',async (req, res, next) => {
const tag=await Tag.findByIdAndRemove(req.params.id);
res.send(tag);

})

module.exports = router;