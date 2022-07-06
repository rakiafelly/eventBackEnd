const express = require('express');
const router = express.Router();
const{registre, login,forgetPassword, resetPassword, logOut}=require('../controllers/auth.controller');
router.post('/registre',registre);
router.post('/login',login );
router.post('/forget-password',forgetPassword);
router.post('/reset-password',resetPassword);
router.get('/logout',logOut);
  module.exports = router;