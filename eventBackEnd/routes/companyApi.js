const express = require('express');
const passport=require('passport')
const {getAllCompany,getCompanyById,createCompany,deleteCompany,updateCompany,imgUpload,getEvents} = require('../controllers/company.controller');
const router = express.Router();
//import Schema
router.get('/company',passport.authenticate('bearer', { session: false })
,getAllCompany);

router.get('/company/:id',passport.authenticate('bearer', { session: false })
,getCompanyById)
//add
router.post('/company',[imgUpload.single('photo'),passport.authenticate('bearer', { session: false })],createCompany);

//update
router.put('/company/:id',[imgUpload.single('photo'),passport.authenticate('bearer', { session: false })
],updateCompany)

//delete
router.delete('/company/:id',passport.authenticate('bearer', { session: false })
,deleteCompany)
router.get('/allEvents',getEvents);

router.get('/connectedCompany',passport.authenticate('bearer',{session:false}))
module.exports = router;