const express = require('express');
const { updateCompany } = require('../controllers/company.controller');
const {getAllCompany,getCompanyBYId,createCompany,updateById,deleteCompany} = require('../controllers/tag.controller');
const router = express.Router();
//import Schema
router.get('/company',getAllCompany);

router.get('/company/:id',getCompanyBYId)
//add
router.post('/company',createCompany);

//update
router.put('/company/:id',updateCompany)

//delete
router.delete('/company/:id',deleteCompany)

module.exports = router;