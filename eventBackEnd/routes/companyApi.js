const express = require('express');
const {getAllCompany,getCompanyById,createCompany,deleteCompany,updateCompany} = require('../controllers/company.controller');
const router = express.Router();
//import Schema
router.get('/company',getAllCompany);

router.get('/company/:id',getCompanyById)
//add
router.post('/company',createCompany);

//update
router.put('/company/:id',updateCompany)

//delete
router.delete('/company/:id',deleteCompany)

module.exports = router;