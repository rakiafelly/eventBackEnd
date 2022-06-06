const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

exports.registre=async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email })
        if (user != null) {
          res.status(400).send({ message: "email already used" })
        }
        else {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.password, salt);
          await User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            password: hash
          });
          res.send({ message: 'register succssefully' });
        }

    } catch(err){
        res.status(500).json({message:'erreur interne dans le serveur'})
    

    }
}

exports.login= async (req, res) => {try{
    const user = await User.findOne({ email: req.body.email })
    if (user == null) {
      res.status(400).send({ message: 'email or password are incorrect' })
    }
    else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
          userId: user._id
        }, 'secret', { expiresIn: '1h' });
        res.send({
          message: 'login successfully', token: token
        })
      }
      else {
        res.status(400).send({ message: 'email or password are incorrect' })
      }
    }}
    catch(err){
        res.status(500).json({message:'erreur interne dans le serveur'})

    }
}

exports.forgetPassword=async(req,res)=>{
    try{

    }
    catch{
        
    }
}