const express = require('express');
const Company = require('../models/company');
const router = express.Router();
//import Schema
router.get('/company', async (req, res, next) => {
    const company = await Company.find()
    res.send(company)
})

router.get('/company/:id', async(req, res, next) => {
    const company=await Company.findById(req.params.id);
    res.send(company);
    
})
//add
router.post('/company', async(req, res, next) => {
const company=await Company.create(req.body);
res.send(company)
})

//update
router.put('/company/:id', async(req, res, next) => {
const company=await Company.findByIdAndUpdate(req.params.id,req.body) 
res.send(company);

})

//delete
router.delete('/company/:id',async (req, res, next) => {
const company=await Company.findByIdAndRemove(req.params.id);
res.send(company);

})

module.exports = router;