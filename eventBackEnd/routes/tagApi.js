const express = require('express');
const {getAllTAgs,getTagBYId,createTag,updateTagById,deleteTag} = require('../controllers/tag.controller');
const router = express.Router();
//import Schema
router.get('/tag', getAllTAgs);

router.get('/tag/:id', getTagBYId);
//add
router.post('/tag',createTag);

//update
router.put('/tag/:id',updateTagById)

//delete
router.delete('/tag/:id',deleteTag);

module.exports = router;