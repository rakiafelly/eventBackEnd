const express = require('express');
const passport=require('passport')
const {getAllCompany,getCompanyById,createCompany,deleteCompany,updateCompany,imgUpload} = require('../controllers/company.controller');
const router = express.Router();
//import Schema
router.get('/company',passport.authenticate('bearer', { session: false }),getAllCompany);

router.get('/company/:id',passport.authenticate('bearer', { session: false }),getCompanyById)
//add
router.post('/company',[passport.authenticate('bearer', { session: false }),imgUpload.single('photo')],createCompany);

//update
router.put('/company/:id',[passport.authenticate('bearer', { session: false }),imgUpload.single('photo')],updateCompany)

//delete
router.delete('/company/:id',passport.authenticate('bearer', { session: false }),deleteCompany)


module.exports = router;