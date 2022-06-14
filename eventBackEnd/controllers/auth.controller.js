const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');
const nodemailer = require('nodemailer');
const Token = require('../models/token');
const path=require('path');
const ejs=require('ejs');
const fs=require('fs');
const randomString=require('randomstring');

exports.registre = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user != null) {
      res.status(400).send({ message: "email already used" })
    }
    else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      });
      res.send({ message: 'register succssefully' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'erreur interne dans le serveur' })


  }
}

exports.login = async (req, res) => {
  try {
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
    }
  }
  catch (err) {
    res.status(500).json({ message: 'erreur interne dans le serveur' })

  }
}

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: 'user not exist' })
    }
    else {
      const token = await Token.findOne({ userId: user._id });
      if (token) {
        await token.deleteOne()
      };
      const resetToken = randomString.generate(30)
      const createdToken = await new Token({
        userId: user._id,
        token: resetToken,
      }).save();

      const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
        secure: true,

      });
      const templatePath = path.resolve('./templates','forgetPassword.html');
      const forgetTemplate = fs.readFileSync(templatePath, {encoding:'utf-8'}) 
      const render= ejs.render(forgetTemplate,{name:user.firstName,link:`http://localhost:4200/${createdToken.token}`})
      const info = await transporter.sendMail({
        from: ' event <sahbigara10@gmail.com>', // sender address
        to: `aymenbouazra994@gmail.com`,
        subject: "Password reset",
        html: render
      });
      //envoyer un email ,restauration de compte

      res.json({ message: 'reset password email is sent' })
    }

  }
  catch (err) {
    console.log({err});
    res.status(500).json({ message: 'internal error in server' })
  }
}