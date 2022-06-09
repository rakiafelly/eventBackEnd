const express = require('express');
const router = express.Router();
const passport = require('passport');
const{registre, login,forgetPassword}=require('../controllers/auth.controller');
router.post('/registre',registre);
router.post('/login',login );
router.post('/forget-password',forgetPassword);


  module.exports = router;